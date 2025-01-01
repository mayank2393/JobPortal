import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "../../redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();
  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg mt-8">
        <div className="my-6">
          <h1 className="font-semibold text-3xl text-gray-800">
            Your Company Name
          </h1>
          <p className="text-gray-600 mt-2">
            What Name would you like to give to your Company? <br />
            <span className="text-sm text-gray-500">
              You can change it later.
            </span>
          </p>
        </div>

        <Label className="text-lg font-medium text-gray-700">
          Company Name
        </Label>
        <Input
          type="text"
          className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="JobHunt, Microsoft, etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex items-center gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
            className="text-gray-600 border-gray-300 hover:text-white hover:bg-gray-600 py-2 px-6 rounded-lg transition-all"
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="bg-[#F83002] hover:bg-[#e1360f] text-white py-2 px-6 rounded-lg transition-all transform hover:scale-105"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
