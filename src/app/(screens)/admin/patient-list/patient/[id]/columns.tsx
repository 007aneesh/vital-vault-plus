'use client'

import { ColumnDef } from '@tanstack/react-table'
import Image from 'next/image'
import React from 'react'
import NOImage from '@/lib/no-image.svg'

export const columns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'date',
    id: 'date',
    header: () => 'Date',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    meta: {
      filterVariant: 'select',
    },
  },
  {
    accessorKey: 'name',
    id: 'name',
    header: () => 'Medication',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorKey: 'image',
    id: 'image',
    header: () => 'Image',
    meta: {
      filters: false,
    },
    cell: (info) => {
      console.log(info.getValue())
      ;<div className='w-full flex items-start bg-red-300 justify-center'>
        info.getValue() ? (
        <Image
          src={info.getValue()}
          alt={`medication-${info.getValue()}`}
          className='w-16 h-16 object-cover'
          height={100}
          width={100}
        />
        ) : (
        <Image
          src={NOImage}
          alt={`no-image`}
          className='w-8 h-8 object-cover'
          height={100}
          width={100}
        />
        ),
      </div>
    },
  },

  {
    accessorKey: 'assigned_by',
    id: 'assigned_by',
    header: () => 'Assigned By',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorKey: 'organisation',
    id: 'organisation',
    header: () => 'Organisation',
    meta: {
      filterVariant: 'range',
    },
  },
  {
    accessorKey: 'note',
    id: 'note',
    header: () => 'Note',
    meta: {
      filters: false,
    },
  },
]
