'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/ui/data-table'
import { Button } from '@/components/ui/button'

import { rolesData } from '../roles'

const RolesPage = () => {
  const router = useRouter()

  // Navigate to role edit page when row is clicked
  const handleRowClick = (roleId: number) => {
    router.push(`/admin/settings/role-management/edit-role/${roleId}`)
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>Role Management</h1>
        <Button
          onClick={() =>
            router.push('/admin/settings/role-management/create-role')
          }
          className='bg-blue-600 text-white'
        >
          Create Role
        </Button>
      </div>

      <DataTable
        columns={[
          { accessorKey: 'role_name', header: 'Role Name' },
          { accessorKey: 'role_type', header: 'Role Type' },
          { accessorKey: 'description', header: 'Description' },
        ]}
        data={rolesData}
        fetchMoreData={() => {}}
        hasMoreData={false}
        onRowClick={(row) => handleRowClick(row.id)}
      />
    </div>
  )
}

export default RolesPage
