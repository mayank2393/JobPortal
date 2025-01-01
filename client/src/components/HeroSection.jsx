import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center px-4 sm:px-8 lg:px-20">
      <div className="flex flex-col gap-6 my-12 lg:my-20">
        {/* Tagline */}
        <span className="mx-auto px-6 py-3 rounded-full bg-gray-100 text-[#121212] font-medium text-sm sm:text-base">
          No. 1 Job Hunt Website
        </span>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#F83002]">Dream Jobs</span>
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-600 mt-4 max-w-3xl mx-auto">
          Unlock endless opportunities with a platform that connects you to the
          best jobs tailored to your skills and aspirations. Begin your journey
          towards a fulfilling career today!
        </p>

        {/* Search Bar */}
        <div className="flex w-full sm:w-[60%] md:w-[50%] lg:w-[40%] shadow-lg border border-gray-200 pl-4 rounded-full items-center gap-4 mx-auto mt-8">
          <input
            type="text"
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full py-2 pl-4 pr-12 rounded-full  transition-all"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#F83002] text-white px-6 py-2 transition-all hover:bg-[#d74e18] focus:ring-2 focus:ring-[#F83002]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
