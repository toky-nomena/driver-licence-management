import { createColumnHelper } from "@tanstack/react-table";
import { Person } from "./data";
import { formatDateToYYYYMMDD } from "@/lib/date";
import { Copy } from "@/components/Copy";

const columnHelper = createColumnHelper<Person>();

export const columns = [
  columnHelper.accessor("firstName", {
    header: "First Name",
    enableGlobalFilter: true,
    enableColumnFilter: true,
    cell: (info) => <Copy>{info.getValue()}</Copy>,
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
    enableGlobalFilter: true,
    enableColumnFilter: true,
    cell: (info) => <Copy>{info.getValue()}</Copy>,
  }),
  columnHelper.accessor("dateOfBirth", {
    header: "Date of Birth",
    cell: (info) => {
      const value = formatDateToYYYYMMDD(info.getValue());
      return <Copy>{value}</Copy>;
    },
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => <Copy>{info.getValue()}</Copy>,
  }),
  columnHelper.accessor("driverLicense", {
    header: "Driver License",
    cell: (info) => <Copy>{info.getValue()}</Copy>,
  }),
  columnHelper.accessor("policyNumber", {
    header: "Policy Number",
    cell: (info) => <Copy>{info.getValue()}</Copy>,
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => {
      const data = info.getValue() as Date;
      return data ? formatDateToYYYYMMDD(data) : "-";
    },
  }),
];
