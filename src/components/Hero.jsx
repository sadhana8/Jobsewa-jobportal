import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    //   <section className="container my-16">
      
    // </section>
    <section className="body-font bg-secondary">
           <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 mb:mb-0">
                  <img
            className="object-cover object-center hover:scale-105 hover:transition rounded"
            src="/job.avif"
            alt="hero"
          />
        </div>
        <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 className="sm:text-4xl text-3xl mb-4 font-medium">
            JobSewa <br className="hidden lg:inline-block" />
            Your go to solution for finding jobs
          </h1>
          <p className="mb-8 leading-relaxed md:w-[80%]">
          Welcome to Job Sewa – where talent meets opportunity.
We are dedicated to bridging the gap between job seekers and recruiters by creating a seamless, efficient, and user-friendly platform. Our mission is to help job seekers find roles that align with their skills, passions, and career goals, while empowering recruiters to connect with the right candidates faster.
          </p>
          <div className="flex justify-center gap-4">
            <Link href={"/jobs"}>
              <Button>Browse Jobs</Button>
              
            </Link>
            <Link href={"/about"}>
              <Button variant="outline">About Us</Button>
            </Link>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Hero;
