'use client'

import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'
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
import { useToastStore } from '@/store/toastStore'
import { useAuthStore } from '@/store/authStore'
import { patient_management } from '@/configs/patient'

export default function Page() {
  const showToast = useToastStore((state) => state.showToast)
  const router = useRouter()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const [listData, setListData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<any>(null)
  const pageSize = 50
  const sortModelRef = useRef<{ sort_by: string; type: 'asc' | 'desc' } | null>(null)
  const [sortModel, setSortModel] = useState<{ sort_by: string; type: 'asc' | 'desc' } | null>(null)
  const filterModel = {}

  const fetchData = useCallback(async (sort?: { sort_by: string; type: 'asc' | 'desc' } | null) => {
    if (!isAuthenticated) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await patient_management.getSSRMPatients({
        pageSize,
        sortModel: sort || undefined,
        filterModel,
      })

      setListData(response?.data?.rows ?? [])
    } catch (err) {
      setError(err)
      showToast({ message: 'Error fetching data', type: 'error' })
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated, showToast])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const breadcrumb_list = [
    { title: 'Dashboard', link: '/admin' },
    { title: 'Patient List' },
  ]

  const handleSortChange = useCallback((newSortModel: { sort_by: string; type: 'asc' | 'desc' } | null) => {
    sortModelRef.current = newSortModel
    setSortModel(newSortModel)
    fetchData(newSortModel)
  }, [fetchData])

  // Memoize DataTable props to prevent rerenders
  const memoizedColumns = useMemo(() => columns, [])
  const memoizedHandlers = useMemo(() => ({
    fetchMoreData: () => {},
    onRowClick: (rowData: { id: string }) => {
      router.push(`/admin/patient-list/patient/${rowData.id}`)
    },
    onSortChange: handleSortChange,
  }), [handleSortChange, router])

  if (error && !listData.length) {
    return (
      <div className="flex items-center justify-center py-12 text-red-600">
        Failed to load patients. Please try again.
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

      <DataTable
        columns={memoizedColumns as any}
        data={listData}
        onRowClick={memoizedHandlers.onRowClick}
        onSortChange={memoizedHandlers.onSortChange}
        currentSort={sortModel}
        isLoading={isLoading}
        enableRowSelection={true}
        enableColumnPinning={true}
        enableColumnReordering={true}
        enableColumnFilters={true}
        enableGlobalFilter={false}
        onRowSelectionChange={(selectedRows) => {
          console.log('Selected rows:', selectedRows)
        }}
        emptyState={
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">No patients found</p>
          </div>
        }
      />
    </div>
  )
}
