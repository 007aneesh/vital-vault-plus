'use client'

import { Person } from '@/@types/tableData'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Person, any>[] = [
  {
    accessorKey: 'id',
    id: 'id',
    header: () => 'Patient Id',
    meta: {
      filterVariant: 'text',
      pinned: 'left',
    },
    enablePinning: true,
  },
  {
    accessorKey: 'first_name',
    id: 'first_name',
    header: 'First Name',
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'last_name',
    id: 'last_name',
    cell: (info) => info.getValue(),
    header: 'Last Name',
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: () => 'Age',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorKey: 'contact_number',
    id: 'contact_number',
    header: () => 'Contact Number',
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'aadhar_number',
    id: 'aadhar_number',
    header: () => 'Aadhar Number',
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'address',
    id: 'address',
    header: () => 'Address',
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'gender',
    id: 'gender',
    header: () => 'Gender',
    meta: {
      filterVariant: 'select',
    },
  },
]
