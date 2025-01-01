import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  // console.log("Job Object:", job);
  // console.log("Job Company:", job?.company);
  // console.log("Job Company Logo:", job?.company?.logo);

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-2xl cursor-pointer transition-shadow duration-300 transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full p-2" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-4 my-4">
        <Button className="p-2" variant="outline" size="icon">
          <Avatar className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-gray-100">
            <AvatarImage
              src={job?.company?.logo}
              className="w-full h-full object-cover object-center"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-semibold text-lg text-gray-800">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500">India</p>
        </div>
      </div>

      <div className="my-4">
        <h2 className="font-semibold text-xl text-gray-800">{job?.title}</h2>
        <p className="text-sm text-gray-600 mt-2">{job?.description}</p>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Badge className="text-blue-700 font-semibold bg-blue-100 px-3 py-1 rounded-full shadow-sm hover:text-white">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-semibold bg-[#FDE2D2] px-3 py-1 rounded-full shadow-sm hover:text-white">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-semibold bg-[#E0D0F4] px-3 py-1 rounded-full shadow-sm hover:text-white">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
        >
          Details
        </Button>
        <Button className="bg-[#7209b7] text-white py-2 px-4 rounded-md hover:bg-[#5f32ad] transition-colors">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
