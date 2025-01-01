import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Badge } from "../ui/badge";

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      // console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="overflow-x-auto bg-gray-50 p-6 rounded-lg shadow-md">
      <Table className="w-full border-collapse">
        <TableCaption className="text-gray-600 font-medium text-sm">
          A list of your recently applied users
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 text-left text-gray-700 font-semibold">
              Full Name
            </TableHead>
            <TableHead className="py-3 px-4 text-left text-gray-700 font-semibold">
              Email
            </TableHead>
            <TableHead className="py-3 px-4 text-left text-gray-700 font-semibold">
              Contact
            </TableHead>
            <TableHead className="py-3 px-4 text-left text-gray-700 font-semibold">
              Resume
            </TableHead>
            <TableHead className="py-3 px-4 text-left text-gray-700 font-semibold">
              Date
            </TableHead>
            <TableHead className="py-3 px-4 text-right text-gray-700 font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants &&
            applicants?.applications?.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-100 transition duration-200"
              >
                <TableCell className="py-3 px-4 text-sm text-gray-600">
                  {item?.applicant?.fullname}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-600">
                  {item?.applicant?.email}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-600">
                  {item?.applicant?.phoneNumber}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm">
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 underline hover:text-blue-800 transition duration-200"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span className="text-gray-500">NA</span>
                  )}
                </TableCell>
                <TableCell className="py-3 px-4 text-sm text-gray-600">
                  {item?.applicant.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer hover:text-gray-700 transition duration-200">
                      <MoreHorizontal />
                    </PopoverTrigger>
                    {item.status === "pending" ? (
                      <PopoverContent className="w-40 bg-white shadow-lg rounded-lg p-4">
                        {shortlistingStatus.map((status, index) => (
                          <div
                            onClick={() => statusHandler(status, item?._id)}
                            key={index}
                            className="flex items-center justify-between my-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md transition duration-200"
                          >
                            <span className="text-sm font-medium text-gray-700">
                              {status}
                            </span>
                          </div>
                        ))}
                      </PopoverContent>
                    ) : (
                      <PopoverContent className="w-fit bg-white shadow-lg rounded-lg p-4">
                        <p className="text-sm text-gray-600 font-medium">
                          {/* Applicant status has already been updated. */}
                          <Badge
                            className={`${
                              item?.status === "rejected"
                                ? "bg-red-400"
                                : item.status === "pending"
                                ? "bg-gray-400"
                                : "bg-green-400"
                            }`}
                          >
                            {item.status.toUpperCase()}
                          </Badge>
                        </p>
                      </PopoverContent>
                    )}
                  </Popover>
                </TableCell>
              </tr>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
