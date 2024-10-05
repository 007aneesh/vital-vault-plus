"use client";

import { ColumnDef } from "@tanstack/react-table";
// import {PatientList} from "@/@types/tableData"
import React from "react";
import { Person } from "./makeData";

export const columns = ColumnDef<Person, any> = [
    {
      accessorKey: "firstName",
      cell: (info) => info.getValue(),
    },
    {
      accessorFn: (row) => row.lastName,
      id: "lastName",
      cell: (info) => info.getValue(),
      header: () => <span>Last Name</span>,
    },
    {
      accessorFn: (row) => `${row.firstName} ${row.lastName}`,
      id: "fullName",
      header: "Full Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "age",
      header: () => "Age",
      meta: {
        filterVariant: "range",
      },
    },
    {
      accessorKey: "visits",
      header: () => <span>Visits</span>,
      meta: {
        filterVariant: "range",
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      meta: {
        filterVariant: "select",
      },
    },
    {
      accessorKey: "progress",
      header: "Profile Progress",
      meta: {
        filterVariant: "range",
      },
    },
  ]