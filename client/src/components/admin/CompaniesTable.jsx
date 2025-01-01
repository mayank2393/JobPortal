import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  // console.log(companies);
  const navigate = useNavigate();
  useEffect(() => { 
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);
  return (
    <div className="overflow-x-auto bg-gray-50 p-6 rounded-lg shadow-md">
      <Table className="w-full border-collapse">
        <TableCaption className="text-gray-600 font-medium text-sm">
          A list of your recently registered companies
        </TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="py-3 px-4 text-left text-gray-700 font-semibold">
              Logo
            </TableHead>
            <TableHead className="py-3 px-4 text-left text-gray-700 font-semibold">
              Name
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
          {filterCompany?.map((company) => (
            <tr
              key={company._id}
              className="hover:bg-gray-100 transition duration-200"
            >
              <TableCell className="py-3 px-4">
                <Avatar className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-gray-200 shadow-sm">
                  <AvatarImage
                    src={company.logo}
                    alt={company.name}
                    className="w-full h-full object-cover object-center"
                  />
                </Avatar>
              </TableCell>
              <TableCell className="py-3 px-4 text-sm text-gray-600">
                {company.name}
              </TableCell>
              <TableCell className="py-3 px-4 text-sm text-gray-600">
                {company.createdAt?.split("T")[0]}
              </TableCell>
              <TableCell className="py-3 px-4 text-right">
                <Popover>
                  <PopoverTrigger className="cursor-pointer hover:text-gray-700 transition duration-200">
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 bg-white shadow-lg rounded-lg p-4">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 rounded-md transition duration-200"
                    >
                      <Edit2 className="w-4 text-gray-700" />
                      <span className="text-sm font-medium text-gray-700">
                        Edit
                      </span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
