import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 hover:shadow-2xl cursor-pointer transition-shadow duration-300 transform hover:scale-105"
    >
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
    </div>
  );
};

export default LatestJobCards;
