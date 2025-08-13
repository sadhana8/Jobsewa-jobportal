"use client";

import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import JobCard from "@/components/JobCard";
import Loading from "@/components/loading";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { getAllJobs } from "@/redux/action/job";
// import { getAllJobs, getSimilarJobs } from "@/redux/action/job";
import { Filter } from "lucide-react";


const JobsPage = () => {
  const { loading, jobs, locations } = useSelector((state) => state.job);
  const dispatch = useDispatch();

  const ref = useRef();

  const clickEvent = () => {
    ref.current.click();
  };

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState(15);

  const [page, setPage] = useState(1);

  const [currentJobId, setCurrentJobId] = useState(null);
  // const [similarJobs, setSimilarJobs] = useState([]);

  // Filter jobs action
  const filterJobs = () => {
    dispatch(getAllJobs(title, location, experience));
    ref.current.click();
  };

  // Clear filters
  const clearFilter = () => {
    setTitle("");
    setLocation("");
    setExperience(15);

    dispatch(getAllJobs());
    ref.current.click();
  };

  // Pagination helpers
  let totalPages = jobs ? Math.ceil(jobs.length / 6) : 1;

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };
  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  // Fetch similar jobs when currentJobId changes
// useEffect(() => {
//   const fetchSimilar = async () => {
//     if (!currentJobId) return;
//     try {
//       const similar = await getSimilarJobs(currentJobId); // 🔴 Error likely here
//       setSimilarJobs(similar);
//     } catch (error) {
//       console.error("Failed to fetch similar jobs:", error);
//     }
//   };
//   fetchSimilar();
// }, [currentJobId]);

  return (
    <div>
      <div className="w-[80%] m-auto mt-3">
        <div className="title flex justify-between items-center">
          <h1 className="text-2xl">
            All <span className="text-red-500">Jobs</span>
          </h1>
          <div className="icon">
            <Button variant="secondary" onClick={clickEvent}>
              <Filter size={18} />
            </Button>
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : (
          <div className="flex items-center flex-wrap gap-9 md:gap-10 p-2">
            {jobs && jobs.length > 0 ? (
              jobs.slice((page - 1) * 6, page * 6).map((job) => (
                <div
                  key={job._id}
                  className={`cursor-pointer border rounded p-2 ${
                    job._id === currentJobId ? "border-blue-500" : "border-transparent"
                  }`}
                  onClick={() => setCurrentJobId(job._id)}
                >
                  <JobCard job={job} />
                </div>
              ))
            ) : (
              <p>No Jobs Yet</p>
            )}
          </div>
        )}

        {jobs && jobs.length > 6 && (
          <div className="mt-2 mb-3">
            <Pagination>
              <PaginationContent>
                {page !== 1 && (
                  <PaginationItem className="cursor-pointer" onClick={prevPage}>
                    <PaginationPrevious />
                  </PaginationItem>
                )}
                {page !== totalPages && (
                  <PaginationItem className="cursor-pointer" onClick={nextPage}>
                    <PaginationNext />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}

        {/* Similar Jobs Section */}
        {/* {currentJobId && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Similar Jobs</h2>
            {similarJobs.length > 0 ? (
              <div className="flex flex-wrap gap-6">
                {similarJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            ) : (
              <p>No similar jobs found.</p>
            )}
          </div>
        )}*/}
      </div> 

      {/* Filter Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button ref={ref} className="hidden"></Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center gap-1">
              Filters <Filter size={18} />
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Search with title</Label>
              <Input
                type="text"
                className="col-span-3"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-[350px] border border-gray-300 p-2 rounded-md ml-2"
            >
              <option value={""}>Select Location</option>
              {locations &&
                locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
            </select>

            <select
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              className="w-[350px] border border-gray-300 p-2 rounded-md ml-2"
            >
              <option value={15}>Select Experience</option>
              <option value={0}>Fresher</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
          </div>

          <DialogFooter>
            <Button onClick={filterJobs}>Apply</Button>
            <Button variant="destructive" onClick={clearFilter}>
              Clear Filter
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobsPage;
