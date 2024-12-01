'use client'
// import { PatientList } from "@/@types/tableData";

import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import React, { useEffect, useState } from 'react'
import { makeData } from '@/lib/personerender'
import AddPatient from '@/components/sections/addPatient'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import _ from 'lodash'
import { Button } from '@/components/ui/button'
import { IconX } from '@/lib/icons'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [data, setData] = useState<any>([])
  const router = useRouter()

  const breadcrumb_list = [
    {
      title: 'Dashboard',
      link: '/admin',
    },
    {
      title: 'Patient List',
    },
  ]

  async function getData() {
    setData(makeData(50))
  }

  const handleRowClick = (data: any) => {
    router.push(`/admin/patient-list/patient/${data.id}`)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <div className='flex flex-col gap-5 md:flex-row justify-between pb-10 items-start'>
        <Breadcrumb>
          <BreadcrumbList>
            {_.map(breadcrumb_list, (item, index) => {
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={item?.link}>
                      {item.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < breadcrumb_list.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <Drawer>
          <DrawerTrigger variant='secondary' className='w-full md:w-auto'>
            Add new patient
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className='flex items-center justify-between'>
              <DrawerTitle>Add new patient:</DrawerTitle>
              <DrawerClose>
                <Button variant='link' className='text-xl'>
                  <IconX />
                </Button>
              </DrawerClose>
            </DrawerHeader>

            <AddPatient />
          </DrawerContent>
        </Drawer>
      </div>

      {/* <Button onClick={() => clearFilters()}>Clear filters</Button> */}
      <DataTable
        columns={columns}
        data={data}
        fetchMoreData={() => {}}
        hasMoreData={true}
        onRowClick={handleRowClick}
      />
    </div>
  )
}
