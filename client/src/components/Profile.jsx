import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

// const user = {
//   fullname: "John Doe",
//   email: "test@gmail.com",
//   profile:{
//     bio: "I am a full stack developer",
//     skills:["Html", "Css", "Javascript", "Reactjs"],
//     resume: "https://www.google.com",
//     resumeOriginalName: "Resume.pdf"
//   },
//   phoneNumber: "1234567890",
// }
const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-10 p-8 shadow-lg">
        {/* Profile Section */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Avatar className="h-28 w-28 border-2 border-gray-300 rounded-full overflow-hidden">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
                className="object-cover"
              />
            </Avatar>
            <div>
              <h1 className="font-bold text-2xl text-gray-800">
                {user?.fullname}
              </h1>
              <p className="text-gray-600 text-sm">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-sm font-medium px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
          >
            <Pen className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        {/* Contact Information */}
        <div className="my-8 border-t border-gray-200 pt-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Contact Information
          </h2>
          <div className="flex items-center gap-4 mb-3">
            <Mail className="text-blue-500 w-5 h-5" />
            <span className="text-gray-700 text-sm">{user?.email}</span>
          </div>
          <div className="flex items-center gap-4">
            <Contact className="text-green-500 w-5 h-5" />
            <span className="text-gray-700 text-sm">{user?.phoneNumber}</span>
          </div>
        </div>

        {/* Skills Section */}
        <div className="my-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap items-center gap-3">
            {user?.profile?.skills.length !== 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg shadow-sm"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <span className="text-gray-500">NA</span>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="my-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Resume</h2>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-500 hover:underline text-sm"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="text-gray-500">NA</span>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl mt-8 p-6 shadow-lg">
        <h1 className="font-bold text-lg text-gray-800 mb-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
