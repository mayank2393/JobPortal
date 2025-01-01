import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../utils/constant";
import { setSingleJob } from "../redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";


// const singleJob = {
//     title: "Software Developer",
//     postion: 2,
//     jobType: "Full Time",
//     salary: 10,
//     location: "Bangalore",
//     description: "Software Developer",
//     experience: 2,
//     applications: [],
//     createdAt: "2022-02-22T00:00:00.000Z",
// };

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isIntiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          ); 
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
    console.log(singleJob);
  }, [jobId, dispatch, user?._id]);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-6">
        <div className="flex items-center justify-between pb-6 border-b border-gray-200">
          <div>
            <h1 className="text-4xl font-semibold text-gray-900">
              {singleJob?.title}
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <Badge className="text-blue-700 font-semibold bg-blue-100 px-4 py-2 rounded-full shadow-md hover:text-white">
                {singleJob?.position} Positions
              </Badge>
              <Badge className="text-[#F83002] font-semibold bg-[#FDE2D2] px-4 py-2 rounded-full shadow-md hover:text-white">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-[#7209b7] font-semibold bg-[#E0D0F4] px-4 py-2 rounded-full shadow-md hover:text-white">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`transition-all duration-300 text-white font-bold py-3 px-8 rounded-full ${
              isApplied
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#7209b7] hover:bg-[#5f32ad] shadow-lg"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>

        <div className="my-8">
          <h2 className="text-2xl font-medium border-b-4 border-gray-300 pb-3 mb-6">
            Job Description
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800">Role:</h3>
              <p className="text-lg text-gray-600">{singleJob?.title}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800">Location:</h3>
              <p className="text-lg text-gray-600">{singleJob?.location}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800">
                Description:
              </h3>
              <p className="text-lg text-gray-600">{singleJob?.description}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800">
                Experience:
              </h3>
              <p className="text-lg text-gray-600">
                {singleJob?.experienceLevel
                  ? `${singleJob.experienceLevel} yrs`
                  : "Not specified"}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800">Salary:</h3>
              <p className="text-lg text-gray-600">{singleJob?.salary} LPA</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800">
                Total Applicants:
              </h3>
              <p className="text-lg text-gray-600">
                {singleJob?.applications?.length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-800">
                Posted Date:
              </h3>
              <p className="text-lg text-gray-600">
                {singleJob?.createdAt.split("T")[0]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
