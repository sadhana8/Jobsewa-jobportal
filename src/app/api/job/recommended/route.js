// import { connectDb } from "@/connectDb";
// import { NextResponse } from "next/server";
// import { Job } from "../../../../../models/Job";
// import { User } from "../../../../../models/User";

// // Utility: TF-IDF Vectorization
// function tfidfVectorize(docs) {
//   const vocabulary = Array.from(new Set(docs.join(" ").toLowerCase().split(" ")));
//   const docCount = docs.length;

//   return docs.map(doc => {
//     const words = doc.toLowerCase().split(" ");
//     return vocabulary.map(term => {
//       const tf = words.filter(w => w === term).length / words.length;
//       const df = docs.filter(d => d.toLowerCase().includes(term)).length;
//       const idf = Math.log(docCount / (1 + df));
//       return tf * idf;
//     });
//   });
// }

// // Utility: Cosine Similarity
// function cosineSimilarity(vecA, vecB) {
//   const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
//   const magA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
//   const magB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
//   return magA && magB ? dotProduct / (magA * magB) : 0;
// }

// export async function GET(req) {
//   try {
//     await connectDb();

//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");

//     if (!userId) {
//       return NextResponse.json({ error: "userId is required" }, { status: 400 });
//     }

//     const seeker = await User.findById(userId);
//     if (!seeker) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     if (!seeker.skills || seeker.skills.length === 0) {
//       return NextResponse.json({ error: "No skills found for this user" }, { status: 400 });
//     }

//     // Get open jobs
//     const jobs = await Job.find({ status: "open" });

//     if (jobs.length === 0) {
//       return NextResponse.json({ message: "No jobs available" }, { status: 200 });
//     }

//     // Prepare documents: seeker skills + job skills
//     const seekerDoc = seeker.skills.join(" ");
//     const jobDocs = jobs.map(job => job.skills.join(" "));
//     const allDocs = [seekerDoc, ...jobDocs];

//     // Vectorize all docs
//     const vectors = tfidfVectorize(allDocs);
//     const seekerVector = vectors[0];
//     const jobVectors = vectors.slice(1);

//     // Compute similarity
//     const scoredJobs = jobs.map((job, i) => ({
//       ...job.toObject(),
//       similarity: cosineSimilarity(seekerVector, jobVectors[i]),
//     }));

//     // Sort by similarity score
//     scoredJobs.sort((a, b) => b.similarity - a.similarity);

//     return NextResponse.json({ recommendedJobs: scoredJobs }, { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { connectDb } from "@/connectDb";
import { Job } from "../../../../../models/Job";
import { User } from "../../../../../models/User";
import { TfIdf } from "natural"; // npm install natural

function cosineSimilarity(a, b) {
  const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return normA && normB ? dotProduct / (normA * normB) : 0;
}

export async function GET(req) {
  await connectDb();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const jobs = await Job.find();
  if (!jobs.length) return NextResponse.json([], { status: 200 });

  const tfidf = new TfIdf();

  // User skills as first document
  tfidf.addDocument((user.skills || []).join(" "));

  // Job skills as documents
  jobs.forEach(job => {
    tfidf.addDocument((job.skills || []).join(" "));
  });

  // All unique terms from user document
  const allTerms = tfidf.listTerms(0).map(t => t.term);

  // Create user vector
  const userVector = allTerms.map(term => {
    const termObj = tfidf.listTerms(0).find(t => t.term === term);
    return termObj ? termObj.tfidf : 0;
  });

  // Calculate similarity for each job
  const results = jobs.map((job, index) => {
    const jobTerms = tfidf.listTerms(index + 1);
    const jobVector = allTerms.map(term => {
      const termObj = jobTerms.find(t => t.term === term);
      return termObj ? termObj.tfidf : 0;
    });
    const score = cosineSimilarity(userVector, jobVector);
    return { ...job.toObject(), similarityScore: score };
  });

  // Sort jobs by similarity score
  results.sort((a, b) => b.similarityScore - a.similarityScore);

  return NextResponse.json(results);
}