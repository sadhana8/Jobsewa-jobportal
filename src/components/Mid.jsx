"use client";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Loading from "./loading";
import JobCard from "./JobCard";

const Mid = () => {
  const { loading, topSix } = useSelector((state) => state.job);
  return (
    <section>
    <div className="mt-8 w-[80%] m-auto mb-8">
      <div className="top flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-semibold mb-3">
          Latest Jobs on Job<span className="text-red-500">Sewa</span>
        </h1>

        <Link href={"/jobs"}>
          <Button variant="secondary">
            View All <ArrowRight size={18} />
          </Button>
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex items-center flex-wrap gap-9">
          {topSix && topSix.length > 0 ? (
            topSix.map((e) => {
              return <JobCard key={e._id} job={e} />;
            })
          ) : (
            <p>No Job Yet</p>
          )}
        </div>
      )}
      </div>
    <footer className="bg-gradient-to-r from-[#375c6b] via-[#203a43] to-[#2c5364] text-gray-300 py-10">

  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Brand */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          <span>Job</span><span className="text-red-500">Sewa</span>
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          "Nepal’s platform for finding skilled workers and hiring with ease."
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
        <ul className="space-y-2 text-sm">
          <li>
            <a href="/" className="hover:text-white transition">Home</a>
          </li>
          <li>
            <a href="/jobs" className="hover:text-white transition">Browse Jobs</a>
          </li>
          <li>
            <a href="/about" className="hover:text-white transition">About Us</a>
          </li>
     
        </ul>
      </div>

      {/* Contact / Social (optional) */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Stay Connected</h3>
        <p className="text-sm text-gray-400 mb-2">jobs@jobsewa.com</p>
        <div className="flex space-x-4 mt-2">
          <a href="#" className="hover:text-white transition">Facebook</a>
          <a href="#" className="hover:text-white transition">Twitter</a>
          <a href="#" className="hover:text-white transition">LinkedIn</a>
        </div>
      </div>
    </div>

    {/* Bottom Line */}
    <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-light-500">
      &copy; 2025 JobSewa. All rights reserved. Made with ❤️ in Nepal.
    </div>
  </div>
</footer>

    </section>
    
  );
};

export default Mid;
