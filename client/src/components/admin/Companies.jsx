import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";


const Companies = () => {
  useGetAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-6 md:px-10 py-8 bg-white shadow-lg rounded-xl border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <Input
            className="w-full md:w-1/3 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Search for a company..."
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/companies/create")}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg shadow-md hover:scale-105 hover:from-blue-600 hover:to-blue-700 transition-transform duration-300"
          >
            + Add New Company
          </Button>
        </div>
        <div className="overflow-hidden shadow-sm rounded-lg">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
