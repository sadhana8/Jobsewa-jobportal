// "use client";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { getRecommendedJobs } from "@/redux/action/job";
// import { useDispatch, useSelector } from "react-redux";

// const RecommendedJobs = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const { jobs, loading } = useSelector((state) => state.job);

//   useEffect(() => {
//     dispatch(getRecommendedJobs());
//   }, [dispatch]);

//   if (loading) {
//     return <p className="p-6 text-gray-500">Loading recommendations...</p>;
//   }

//   if (!jobs || jobs.length === 0) {
//     return <p className="p-6 text-gray-500">No recommendations available</p>;
//   }

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Recommended Jobs</h1>

//       {/* Horizontal scroll container */}
//       <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
//         {jobs.map((job) => (
//           <div
//             key={job._id}
//             className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 min-w-[250px] flex-shrink-0"
//           >
//             {/* Company Logo */}
//                 <img
//                 src={job.comapnyLogo}
//                   alt="company"
//                   className="rounded-full w-16 h-16"
//             />

//             {/* Job Title */}
//             <h2 className="text-lg font-bold truncate">{job.title}</h2>

//             {/* Company Name */}
//             {job.company?.name && (
//               <p className="text-gray-700">{job.company.name}</p>
//             )}

//             {/* Skills */}
//             {Array.isArray(job.skills) && job.skills.length > 0 && (
//               <p className="text-sm text-gray-500 mt-1">
//                 Skills: {job.skills.join(", ")}
//               </p>
//             )}

//             {/* Read More Button */}
//             <button
//               onClick={() => router.push(`/jobs/${encodeURIComponent(job._id)}`)}
//               className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//             >
//               Read More
//             </button>
//           </div>
//         ))}
//       </div>
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

  if (loading) {
    return <p className="p-6 text-gray-500">Loading recommendations...</p>;
  }

  // Filter out closed jobs (extra safety)
  const openJobs =
    jobs?.filter((job) => job.status?.toLowerCase() === "open") || [];

  if (openJobs.length === 0) {
    return <p className="p-6 text-gray-500">No recommendations available</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Recommended Jobs</h1>

      {/* Horizontal scroll container */}
      <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {openJobs.map((job) => (
          <div
            key={job._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300 min-w-[250px] flex-shrink-0"
          >
            {/* Company Logo */}
            {job.comapnyLogo && (
              <img
                src={job.comapnyLogo}
                alt="company"
                className="rounded-full w-16 h-16"
              />
            )}

            {/* Job Title */}
            <h2 className="text-lg font-bold truncate">{job.title}</h2>

            {/* Company Name */}
            {job.company?.name && (
              <p className="text-gray-700">{job.company.name}</p>
            )}

            {/* Skills */}
            {Array.isArray(job.skills) && job.skills.length > 0 && (
              <p className="text-sm text-gray-500 mt-1">
                Skills: {job.skills.join(", ")}
              </p>
            )}

            {/* Read More Button */}
            <button
              onClick={() =>
                router.push(`/jobs/${encodeURIComponent(job._id)}`)
              }
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

