import React,{useState,useEffect} from 'react'
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42k-1lakh", "1lakh-5lakh"],
  },
];

const FilterCard = () => {
   const [selectedValue, setSelectedValue] = useState("");
   const dispatch = useDispatch();
   const changeHandler = (value) => {
     setSelectedValue(value);
   };
   useEffect(() => {
     dispatch(setSearchedQuery(selectedValue));
      // console.log(selectedValue);
   }, [selectedValue]);
  return (
    <div className="w-full max-w-xs bg-white p-5 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-all">
      <h1 className="font-bold text-xl text-gray-800 mb-3">Filter Jobs</h1>
      <hr className="mt-2 mb-4 border-t border-gray-300" />

      {/* Map over the filter data and create a separate RadioGroup for each filter type */}
      {fitlerData.map((data, index) => (
        <div key={index} className="mb-4">
          {" "}
          {/* Reduced bottom margin for compactness */}
          <h2 className="font-semibold text-lg text-gray-700 mb-2">
            {data.fitlerType}
          </h2>
          {/* Create a separate RadioGroup for each filter type */}
          <RadioGroup className="space-y-2" onValueChange={changeHandler} value={selectedValue}>
            {" "}
            {/* Reduced vertical space between items */}
            {/* Loop over each item in the filter's array */}
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div className="flex items-center space-x-3" key={itemId}>
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    name={data.fitlerType} // Unique name for each filter type
                    className="text-indigo-600"
                  />
                  <Label
                    htmlFor={itemId}
                    className="text-gray-600 hover:text-indigo-600 cursor-pointer transition-all"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};




export default FilterCard