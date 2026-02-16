'use client'

import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import React from 'react'
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
import { useAuthStore } from '@/store/authStore'
import useSWR from 'swr'
import { employee_management } from '@/configs/employee'

export default function Page() {
  const showToast = useToastStore((state) => state.showToast)
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const { data, error, isLoading } = useSWR(
    isAuthenticated ? 'employees-list' : null,
    () => employee_management.getAllEmployees(),
    {
      onError: () => {
        showToast({ message: 'Error fetching data', type: 'error' })
      },
    },
  )

  const listData = (data?.data as unknown[]) ?? []

  const breadcrumb_list = [
    { title: 'Dashboard', link: '/admin' },
    { title: 'Employee List' },
  ]

  const handleRowClick = (rowData: { id: string }) => {
    router.push(`/admin/employee/${rowData.id}`)
  }

  if (error && !listData.length) {
    return (
      <div className="flex items-center justify-center py-12 text-red-600">
        Failed to load employees. Please try again.
      </div>
    )
  }

  return (
    <div>
      <div className='flex flex-col gap-5 md:flex-row justify-between pb-10 items-start'>
        <Breadcrumb>
          <BreadcrumbList>
            {_.map(breadcrumb_list, (item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={(item as { link?: string }).link}>
                    {item.title}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {index < breadcrumb_list.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={listData}
          fetchMoreData={() => {}}
          hasMoreData={true}
          onRowClick={handleRowClick}
        />
      )}
    </div>
  )
}
