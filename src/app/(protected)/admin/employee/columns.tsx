'use client'

import { Person } from '@/@types/tableData'
import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<Person, any>[] = [
  {
    id: 'select',
    size: 50,
    minSize: 50,
    maxSize: 50,
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
          aria-label="Select all"
          className="cursor-pointer w-4 h-4"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(e.target.checked)}
          aria-label="Select row"
          className="cursor-pointer w-4 h-4"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    enablePinning: true,
    enableResizing: false,
    meta: {
      pinned: 'left',
      filters: false,
    },
  },
  {
    accessorKey: 'first_name',
    id: 'first_name',
    header: 'First Name',
    cell: (info) => <div className="font-medium">{info.getValue()}</div>,
    size: 180,
    minSize: 150,
    maxSize: 400,
    meta: {
      filterVariant: 'text',
      pinned: 'left',
    },
    enablePinning: true,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'last_name',
    id: 'last_name',
    header: 'Last Name',
    cell: (info) => info.getValue(),
    size: 180,
    minSize: 150,
    maxSize: 400,
    meta: {
      filterVariant: 'text',
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'access_level',
    id: 'access_level',
    header: 'Access Level',
    cell: (info) => {
      const level = info.getValue() as string
      const colorClass = level === 'ADMIN' 
        ? 'bg-blue-100 text-blue-800' 
        : level === 'GOD' 
        ? 'bg-red-100 text-red-800' 
        : 'bg-gray-100 text-gray-800'
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
          {level}
        </span>
      )
    },
    size: 160,
    minSize: 140,
    maxSize: 250,
    meta: {
      filterVariant: 'select',
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'age',
    id: 'age',
    header: 'Age',
    cell: (info) => <div className="text-center">{info.getValue()}</div>,
    size: 120,
    minSize: 100,
    maxSize: 200,
    meta: {
      filterVariant: 'range',
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'gender',
    id: 'gender',
    header: 'Gender',
    cell: (info) => {
      const value = info.getValue() as string
      return (
        <div className="flex items-center">
          <span className="capitalize">{value?.toLowerCase()}</span>
        </div>
      )
    },
    size: 140,
    minSize: 120,
    maxSize: 200,
    meta: {
      filterVariant: 'select',
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'contact_number',
    id: 'contact_number',
    header: 'Contact Number',
    cell: (info) => <div className="font-mono text-sm">{info.getValue()}</div>,
    size: 180,
    minSize: 160,
    maxSize: 300,
    meta: {
      filterVariant: 'text',
    },
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: 'aadhar_number',
    id: 'aadhar_number',
    header: 'Aadhar Number',
    cell: (info) => <div className="font-mono text-sm">{info.getValue()}</div>,
    size: 180,
    minSize: 160,
    maxSize: 300,
    meta: {
      filterVariant: 'text',
    },
    enableSorting: true,
    enableHiding: true,
  },
]
