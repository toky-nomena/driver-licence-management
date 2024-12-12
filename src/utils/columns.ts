import { createColumnHelper } from "@tanstack/react-table";
import { format } from "date-fns";
import { Person } from "./data";

const columnHelper = createColumnHelper<Person>();

export const columns = [
  columnHelper.accessor("firstName", {
    header: "First Name",
    enableGlobalFilter: true,
    enableColumnFilter: true,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
    enableGlobalFilter: true,
    enableColumnFilter: true,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("dateOfBirth", {
    header: "Date of Birth",
    cell: (info) => {
      const data = info.getValue() as Date;
      return data ? format(data, "dd/MM/yyyy") : "-";
    },
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue() || "-",
  }),
  columnHelper.accessor("driverLicense", {
    header: "Driver License",
    cell: (info) => info.getValue() || "-",
  }),
  columnHelper.accessor("policyNumber", {
    header: "Policy Number",
    cell: (info) => info.getValue() || "-",
  }),
];
