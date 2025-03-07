'use client'

import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import React, { useEffect, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import _ from 'lodash'
import { useRouter } from 'next/navigation'
import { useToastStore } from '@/store/toastStore'
import { employee_management } from '@/configs/employee'

export default function Page() {
  const [data, setData] = useState<any>([])
  const showToast = useToastStore((state) => state.setShowToast)
  const router = useRouter()

  const breadcrumb_list = [
    {
      title: 'Dashboard',
      link: '/admin',
    },
    {
      title: 'Employee List',
    },
  ]

  const handleRowClick = (data: any) => {
    router.push(`/admin/employee/${data.id}`)
  }

  useEffect(() => {
    const getEmployeesData = async () => {
      try {
        const response = await employee_management.getAllEmployees()
        setData(response?.data)
        showToast({
          message: 'Success',
          type: 'success',
        })
      } catch (error) {
        showToast({
          message: 'Error fetching data',
          type: 'error',
        })
      }
    }
    if(_.isEmpty(data)) getEmployeesData()
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
      </div>

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
