import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-8">
        {/* Logo Section */}
        <div className="flex items-center">
          {user && user.role === "recruiter" ? (
            <h1 className="text-2xl font-semibold text-gray-900 tracking-wide  transform transition-transform duration-200 hover:scale-105">
              Job<span className="text-[#F83002]">Portal</span>
            </h1>
          ) : (
            <Link to="/">
              <h1 className="text-2xl font-semibold text-gray-900 tracking-wide cursor-pointer transform transition-transform duration-200 hover:scale-105">
                Job<span className="text-[#F83002]">Portal</span>
              </h1>
            </Link>
          )}
        </div>

        {/* Navbar Links */}
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-8 text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-[#F83002] transform transition-colors duration-200"
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-[#F83002] transform transition-colors duration-200"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#F83002] transform transition-colors duration-200"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-[#F83002] transform transition-colors duration-200"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="hover:text-[#F83002] transform transition-colors duration-200"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Authentication / User Section */}
          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="px-6 py-2 text-[#F83002] border-2 border-[#F83002] hover:bg-[#F83002] hover:text-white transition-all duration-200"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="px-6 py-2 bg-[#F83002] text-white hover:bg-[#D93802] transition-all duration-200">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer w-10 h-10 rounded-full border-2 border-gray-300 hover:ring-2 hover:ring-[#F83002] transition-all duration-200">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt={user?.fullname}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white shadow-lg rounded-lg p-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16 rounded-full overflow-hidden">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt={user?.fullname}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                {/* Profile and Logout Links */}
                <div className="flex flex-col gap-4 text-gray-600">
                  {user.role === "student" && (
                    <div className="flex items-center gap-2 cursor-pointer hover:text-[#F83002] transition-colors duration-200">
                      <User2 />
                      <Link to="/profile">
                        <Button
                          variant="link"
                          className="text-gray-600 hover:text-[#F83002]"
                        >
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  )}

                  <div className="flex items-center gap-2 cursor-pointer hover:text-[#F83002] transition-colors duration-200">
                    <LogOut />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-gray-600 hover:text-[#F83002]"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
