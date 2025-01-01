import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
    setOpen(false);
    // console.log(input);
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[480px] bg-white rounded-xl shadow-lg border border-gray-200 p-6 [&>button]:hidden"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-2xl font-semibold text-gray-800 mb-4">
              <span>Update Profile</span>
              <X
                className="h-6 w-6 text-gray-500 cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </DialogTitle>
          </DialogHeader>

          {/* <button> */}

          {/* </button> */}
          <form onSubmit={submitHandler}>
            <div className="grid gap-6 py-4">
              {/* Name Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 text-right"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  className="col-span-3 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Email Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 text-right"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Phone Number Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="number"
                  className="text-sm font-medium text-gray-700 text-right"
                >
                  Number
                </Label>
                <Input
                  id="number"
                  name="number"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                  className="col-span-3 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Bio Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="bio"
                  className="text-sm font-medium text-gray-700 text-right"
                >
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Skills Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="skills"
                  className="text-sm font-medium text-gray-700 text-right"
                >
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeEventHandler}
                  className="col-span-3 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {/* Resume Upload Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="file"
                  className="text-sm font-medium text-gray-700 text-right"
                >
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileChangeHandler}
                  className="col-span-3 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button
                  className="w-full my-4 bg-gray-300 text-gray-700 flex justify-center items-center gap-2 rounded-lg py-2 shadow-md"
                  disabled
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-gray-600" />
                  Please wait...
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
