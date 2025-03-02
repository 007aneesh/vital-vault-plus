'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { rolesData } from '../../../roles' // Import role data
import { PERMISSIONS } from '../../../roles'
import { Input } from '@/components/ui/input'

const EditRole = () => {
  const router = useRouter()
  const { id } = useParams() // Get role ID from URL
  const roleId = Number(id)

  // Fetch role by ID (Simulating a DB fetch)
  const [role, setRole] = useState(() => rolesData.find((r) => r.id === roleId))

  useEffect(() => {
    if (!role) {
      router.replace('/admin/settings/role-management')
    }
  }, [role, router])

  if (!role) return null

  // Toggle full access
  const toggleFullAccess = (category: string) => {
    setRole((prevRole) => {
      if (!prevRole) return undefined
      return {
        ...prevRole,
        access_permissions: prevRole.access_permissions.map((p) =>
          p.category === category
            ? {
                ...p,
                permissions:
                  p.permissions.length === Object.values(PERMISSIONS).length
                    ? []
                    : Object.values(PERMISSIONS),
              }
            : p,
        ),
      }
    })
  }

  // Toggle individual permission
  const togglePermission = (category: string, permission: string) => {
    setRole((prevRole) => {
      if (!prevRole) return undefined
      return {
        ...prevRole,
        access_permissions: prevRole.access_permissions.map((p) =>
          p.category === category
            ? {
                ...p,
                permissions: p.permissions.includes(permission)
                  ? p.permissions.filter((perm) => perm !== permission)
                  : [...p.permissions, permission],
              }
            : p,
        ),
      }
    })
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>Edit Role: {role.role_name}</h2>

      {role.access_permissions.map(({ category, permissions }) => (
        <Card key={category} className='mb-4 scale-100 hover:scale-100'>
          <div className='flex flex-row justify-between items-center p-4 border-b'>
            <div className='text-lg font-semibold'>{category}</div>
            <div className='flex items-center gap-4'>
              <Input
                type='checkbox'
                checked={
                  permissions.length === Object.values(PERMISSIONS).length
                }
                onChange={() => toggleFullAccess(category)}
              />
              <span className='text-sm text-gray-600'>Full Access</span>
            </div>
          </div>
          <div className='p-4'>
            <div className='grid grid-cols-2 gap-2'>
              {Object.values(PERMISSIONS).map((perm) => (
                <div key={perm} className='flex items-center gap-2'>
                  <Input
                    type='checkbox'
                    checked={permissions.includes(perm)}
                    onChange={() => togglePermission(category, perm)}
                  />
                  <span className='text-sm'>{perm}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}

      <div className='flex justify-end mt-6 gap-4'>
        <Button
          variant='outline'
          onClick={() => router.push('/admin/settings/role-management')}
        >
          Cancel
        </Button>
        <Button className='bg-blue-600 text-white'>Save Changes</Button>
      </div>
    </div>
  )
}

export default EditRole
