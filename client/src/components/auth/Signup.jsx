import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import bg from "../../assets/bg-sn.png";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); 
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  // const loading = false;

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat overflow-y-hidden"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <Navbar className="z-50" />
      <div className="flex items-center justify-center max-w-6xl mx-auto my-auto">
        <form
          onSubmit={submitHandler}
          className="bg-white/80 border border-gray-300 rounded-lg p-7 flex flex-col items-center space-y-4 w-full max-w-md shadow-lg my-10"
        >
          <h1 className="font-bold text-3xl mb-4 text-center tracking-wide">
            Sign Up
          </h1>

          <div className="flex flex-col gap-3 w-full">
            <div className="my-2 flex items-center justify-center gap-2">
              <Label className="w-[10rem]">Name</Label>
              <Input
                type="text"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                placeholder="patel"
              />
            </div>

            <div className="my-2 flex items-center justify-center gap-2">
              <Label className="w-[10rem]">Email</Label>
              <Input
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                placeholder="patel@gmail.com"
                // className=" w-[23rem]"
              />
            </div>
            <div className="my-2 flex items-center justify-center gap-2">
              <Label className="w-[10rem]">Phone No</Label>
              <Input
                type="text"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
                placeholder="8080808080"
                // className=" w-[23rem]"
              />
            </div>
            <div className="my-2 flex items-center justify-center gap-2">
              <Label className="w-[10rem]">Password</Label>
              <Input
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
                placeholder="patel@gmail.com"
                // className=" w-[23rem]"
              />
            </div>
            <div className="my-2 flex items-center justify-center gap-2">
              <Label className="w-[10rem]">Profile Picture</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className=" cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mr-5">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  id="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="student" className="cursor-pointer">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  id="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="recruiter" className="cursor-pointer">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
          </div>
          {loading ? (
            <Button className="w-full">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full">
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[#2f94f8] text-[1rem]">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
