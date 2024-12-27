import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
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
  {
    _id: 7,
    company: { name: "Google" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "50",
  },
  {
    _id: 8,
    company: { name: "Amazon" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "30",
  },
  {
    _id: 9,
    company: { name: "Facebook" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "40",
  },
  {
    _id: 10,
    company: { name: "Microsoft" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "45",
  },
  {
    _id: 11,
    company: { name: "Apple" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "55",
  },
  {
    _id: 12,
    company: { name: "Tesla" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "20",
  },
  {
    _id: 13,
    company: { name: "Google" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "50",
  },
  {
    _id: 14,
    company: { name: "Amazon" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
    jobType: "IT",
    salary: "30",
  },
  {
    _id: 15,
    company: { name: "Facebook" },
    title: "Software Engineer",
    description: "Enjoying this work",
    position: "SDE1",
  }
];
const Jobs = () => {
//   const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

//   useEffect(() => {
//     if (searchedQuery) {
//       const filteredJobs = allJobs.filter((job) => {
//         return (
//           job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
//           job.location.toLowerCase().includes(searchedQuery.toLowerCase())
//         );
//       });
//       setFilterJobs(filteredJobs);
//     } else {
//       setFilterJobs(allJobs);
//     }
//   }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
