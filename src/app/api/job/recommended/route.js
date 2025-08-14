
import { NextResponse } from "next/server";
import { connectDb } from "@/connectDb";
import { Job } from "../../../../../models/Job";
import { User } from "../../../../../models/User";
import { TfIdf } from "natural"; 
import mongoose from "mongoose";

// Cosine similarity helper
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, idx) => sum + a * vecB[idx], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
}

export async function GET(req) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const limit = parseInt(searchParams.get("limit")) || 5;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Valid User ID is required" }, { status: 400 });
    }

    const user = await User.findById(userId).lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get excluded jobs (already applied/saved)
    const excludedJobIds = [
      ...(user.appliedJobs || []),
      ...(user.savedJobs || []),
    ];

    // Filter only OPEN, not owned by user, not already applied/saved
    const jobs = await Job.find({
      status: { $regex: /^open$/i },
      _id: { $nin: excludedJobIds },
      recruiterId: { $ne: userId },
      skills: { $exists: true, $ne: [] }
    })
      .sort({ createdAt: -1 }) // Recent jobs first before similarity sort
      .lean();

    if (!jobs.length) {
      return NextResponse.json([], { status: 200 });
    }

    const tfidf = new TfIdf();

    // Add user skills as first doc
    tfidf.addDocument((user.skills || []).join(" "));

    // Add job skills as docs
    jobs.forEach(job => {
      tfidf.addDocument((job.skills || []).join(" "));
    });

    // Create vocabulary
    const allTerms = tfidf.listTerms(0).map(t => t.term);

    // User vector
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
      const similarityScore = cosineSimilarity(userVector, jobVector);
      return { ...job, similarityScore };
    });

    // Sort by similarity (desc), then recent (desc)
    const sortedResults = results
      .sort((a, b) => {
        if (b.similarityScore === a.similarityScore) {
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return b.similarityScore - a.similarityScore;
      })
      .slice(0, limit);

    return NextResponse.json(sortedResults);
  } catch (error) {
    console.error("Error fetching recommended jobs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
