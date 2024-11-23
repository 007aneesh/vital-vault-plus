'use client'

import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

export const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'name',
    id: 'name',
    header: () => 'Aadhar Number',
    meta: {
      filterVariant: 'range',
      pinned: 'left',
    },
    enablePinning: true,
  },
  {
    accessorKey: 'firstName',
    id: 'firstName',
    header: 'First Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorFn: (row) => row.lastName,
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
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
      filterVariant: 'range',
    },
  },
  {
    accessorKey: 'address',
    id: 'address',
    header: () => 'Address',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorKey: 'gender',
    id: 'gender',
    header: () => 'Gender',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorKey: 'lastVisit',
    id: 'lastVisit',
    header: 'Last Visit',
    meta: {
      filterVariant: 'range',
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
  {
    accessorKey: 'viewDetails',
    id: 'viewDetails',
    header: 'View Details',
    meta: {
      pinned: 'right',
    },
    enablePinning: true,
    cell: () => <button>Show</button>,
  },
]
