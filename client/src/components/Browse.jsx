import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
// import { setSearchedQuery } from "@/redux/jobSlice";
// import useGetAllJobs from "@/hooks/useGetAllJobs";

const randomJobs = [
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
  },
];

const Browse = () => {
//   useGetAllJobs();
//   const { allJobs } = useSelector((store) => store.job);
//   const dispatch = useDispatch();
  useEffect(() => {
    return () => {
    //   dispatch(setSearchedQuery(""));
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">
          Search Results ({randomJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {randomJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
