import React from "react";
import LatestJobCards from "./LatestJobCards";

const allJobs = [
  {
    _id: 1,
    company: { name: "Google" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "50",
  },
  {
    _id: 2,
    company: { name: "Amazon" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "30",
  },
  {
    _id: 3,
    company: { name: "Facebook" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "40",
  },
  {
    _id: 4,
    company: { name: "Microsoft" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "45",
  },
  {
    _id: 5,
    company: { name: "Apple" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "55",
  },
  {
    _id: 6,
    company: { name: "Tesla" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "20",
  },
];

const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#F83002]">Latest & Top </span> Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
