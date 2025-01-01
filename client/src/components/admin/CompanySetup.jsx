import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input?.name);
    formData.append("description", input?.description);
    formData.append("website", input?.website);
    formData.append("location", input?.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 bg-white p-8 shadow-lg rounded-lg">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 mb-6">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold hover:bg-gray-100"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-semibold text-2xl text-gray-800">
              Company Setup
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-700">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input?.name}
                onChange={changeEventHandler}
                className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <Label className="text-gray-700">Description</Label>
              <Input
                type="text"
                name="description"
                value={input?.description}
                onChange={changeEventHandler}
                className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <Label className="text-gray-700">Website</Label>
              <Input
                type="text"
                name="website"
                value={input?.website}
                onChange={changeEventHandler}
                className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <Label className="text-gray-700">Location</Label>
              <Input
                type="text"
                name="location"
                value={input?.location}
                onChange={changeEventHandler}
                className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <Label className="text-gray-700">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="mt-2 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {loading ? (
            <Button className="my-4 py-2 px-6 bg-gray-500 text-white rounded-lg flex items-center justify-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="mt-6 py-2 px-6 bg-[#F83002] hover:bg-[#e1360f] text-white rounded-lg transition-all mx-auto block"
            >
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
