import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "UI/UX Designer",
  "Software Engineer",
  "iOS Developer",
  "Cloud Engineer",
  "AWS Solutions Architect",
  "VR Developer",
  "AI Research Scientist",
  "Devops Engineer",
  "Chip Designer",
  "GPU Engineer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div>
      <Carousel className="w-full max-w-[55rem] mx-auto my-16 relative">
        <CarouselContent className="flex gap-4">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center md:basis-1/2 lg:basis-1/4 gap-2"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full border-gray-300 text-gray-700 px-5 py-2 shadow-sm hover:shadow-md transition-all hover:bg-gray-100 focus:ring-2 focus:ring-gray-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Navigation Buttons */}
        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-600 p-3 rounded-full hover:bg-gray-300 transition-all" />
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-600 p-3 rounded-full hover:bg-gray-300 transition-all" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
