'use client'

import { Person } from '@/@types/tableData'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

export const columns: ColumnDef<Person, any>[] = [
  {
    accessorKey: 'aadhar',
    id: 'aadhar',
    header: () => 'Aadhar Number',
    meta: {
      filterVariant: 'text',
      pinned: 'left',
    },
    enablePinning: true,
  },
  {
    accessorKey: 'firstName',
    id: 'firstName',
    header: 'First Name',
    cell: (info) => info.getValue(),
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorFn: (row) => row.lastName,
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'role',
    id: 'role',
    header: () => 'Role',
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
    accessorKey: 'contact',
    id: 'contact',
    header: () => 'Contact Number',
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
  {
    accessorKey: 'lastVisit',
    id: 'lastVisit',
    header: 'Last Visit',
    meta: {
      filterVariant: 'text',
    },
  },
  {
    accessorKey: 'status',
    id: 'status',
    header: 'Status',
    meta: {
      filterVariant: 'select',
    },
  },
]
