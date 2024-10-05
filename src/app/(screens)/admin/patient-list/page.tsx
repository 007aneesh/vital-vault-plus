// import { PatientList } from "@/@types/tableData";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import axios from "axios";
import React from "react";
import { makeData, Person } from "./makeData";


export default async function Page() {

  const rerender = React.useReducer(() => ({}), {})[1]

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  // const response = await axios.get(
  //   "https://jsonplaceholder.typicode.com/posts"
  // );
  // const data = response.data; 

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
