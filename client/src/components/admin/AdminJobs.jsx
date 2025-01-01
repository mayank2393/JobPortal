import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-6 md:px-10 py-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <Input
            className="w-full md:w-1/3 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:scale-105 hover:from-green-600 hover:to-green-700 transition-transform duration-300"
          >
            + Add New Job
          </Button>
        </div>
        <div className="overflow-hidden shadow-sm rounded-lg">
          <AdminJobsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
