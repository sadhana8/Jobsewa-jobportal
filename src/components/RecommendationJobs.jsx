// "use client";

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getRecommendedJobs } from "@/redux/action/job";
// import { Badge } from "@/components/ui/badge";

// const RecommendedJobs = () => {
//   const dispatch = useDispatch();
//   const { jobs, loading, error } = useSelector((state) => state.job);

//   useEffect(() => {
//     dispatch(getRecommendedJobs());
//   }, [dispatch]);

//   if (loading) return <p className="text-center py-4">Loading recommendations...</p>;
//   if (error) return <p className="text-center text-red-500 py-4">{error}</p>;

//   return (
//     <div className="max-w-4xl mx-auto py-8">
//       <h1 className="text-2xl font-bold mb-6">Recommended Jobs</h1>

//       {Array.isArray(jobs) && jobs.length > 0 ? (
//         <div className="grid gap-4 md:grid-cols-2">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="p-5 border rounded-xl shadow-sm hover:shadow-md transition"
//             >
//               <h2 className="text-lg font-semibold">{job.title}</h2>
//               <p className="text-sm text-gray-500 mb-2">{job.company?.name}</p>
//               <p className="mb-4 line-clamp-3">{job.description}</p>

//               <div className="flex flex-wrap gap-2 mb-3">
//                 {Array.isArray(job.skills) &&
//                   job.skills.map((skill, i) => (
//                     <Badge key={i} variant="secondary">{skill}</Badge>
//                   ))}
//               </div>

//               <div className="text-sm text-gray-600">
//                 <p>Location: {job.location}</p>
//                 <p>Experience: {job.experience} years</p>
//                 <p>Salary: ₹{job.salary?.toLocaleString()}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No recommendations found.</p>
//       )}
//     </div>
//   );
// };

// export default RecommendedJobs;

"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRecommendedJobs } from "@/redux/action/job";
import { useDispatch, useSelector } from "react-redux";


const RecommendedJobs = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { jobs, loading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(getRecommendedJobs());
  }, [dispatch]);

  if (loading) return <p>Loading recommendations...</p>;
  if (!jobs || jobs.length === 0) return <p>No recommendations available</p>;

  return (
    // <div className="p-6">
    //   <h1 className="text-2xl font-bold mb-4">Recommended Jobs</h1>
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //     {jobs.map((job) => (
    //       <div
    //         key={job._id}
    //         className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
    //       >
         
    //         <img
    //           src={job.comapnyLogo}
    //           alt="company"
    //           className="rounded-full w-16 h-16"
    //         />
       

    //         <h2 className="text-lg font-bold">{job.title}</h2>

    //        {job.company?.name && <p className="text-white">{job.company.name}</p>}

    //         {Array.isArray(job.skills) && job.skills.length > 0 && (
    //           <p className="text-sm text-gray-500">
    //             Skills: {job.skills.join(", ")}
    //           </p>
    //         )}
    //         <button
    //           onClick={() => router.push(`/jobs/${job._id}`)}
    //           className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    //         >
    //           Read More
    //         </button>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="p-6">
  <h1 className="text-2xl font-bold mb-4">Recommended Jobs</h1>

  {/* Horizontal scroll container */}
  <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
    {jobs.map((job) => (
      <div
        key={job._id}
        className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 min-w-[250px] flex-shrink-0"
      >
       
             <img
               src={job.comapnyLogo}
          alt="company"
               className="rounded-full w-16 h-16"
       />

        <h2 className="text-lg font-bold">{job.title}</h2>

        {job.company?.name && (
          <p className="text-gray-700">{job.company.name}</p>
        )}

        {Array.isArray(job.skills) && job.skills.length > 0 && (
          <p className="text-sm text-gray-500">
            Skills: {job.skills.join(", ")}
          </p>
        )}

        <button
          onClick={() => router.push(`/jobs/${job._id}`)}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Read More
        </button>
      </div>
    ))}
  </div>
</div>

  );
};

export default RecommendedJobs;