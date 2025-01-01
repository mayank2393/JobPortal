import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "./ui/button"; // Assuming you have a reusable Button component
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6">
      <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        {/* Icon */}
        <AlertCircle className="w-16 h-16 text-red-500" />

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Oops! Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base">
          The page you are looking for does not exist or has been moved. Please
          check the URL or return to the homepage.
        </p>

        {/* Action Button */}
        <Button
          onClick={() => navigate("/")}
          className="bg-red-500 text-white px-6 py-2 rounded-full mt-4 hover:bg-red-600 transition-all"
        >
          Go Back to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
