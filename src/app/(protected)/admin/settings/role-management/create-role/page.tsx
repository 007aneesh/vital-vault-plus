/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useRouter } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem } from '@/components/ui/select'

import { ROLES, CATEGORIES, PERMISSIONS } from '../../roles' // Import constants

// Validation Schema using Zod
const roleSchema = z.object({
  role_name: z.string().min(3, 'Role Name must be at least 3 characters.'),
  role_type: z.enum(Object.values(ROLES) as [string, ...string[]], {
    message: 'Invalid Role Type',
  }),
  access_permissions: z.array(
    z.object({
      category: z.string(),
      permissions: z.array(z.string()),
    }),
  ),
})

const CreateRole = () => {
  const router = useRouter()
  const { control, handleSubmit, setValue, watch } = useForm<
    z.infer<typeof roleSchema>
  >({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role_name: '',
      role_type: ROLES.DOCTOR,
      access_permissions: Object.values(CATEGORIES).map((category) => ({
        category,
        permissions: [] as string[],
      })),
    },
  })

  const permissionsData = watch('access_permissions')

  // Handle Full Access Toggle
  const toggleFullAccess = (category: string) => {
    setValue(
      'access_permissions',
      permissionsData.map((p) =>
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
    )
  }

  // Toggle Individual Permission
  const togglePermission = (category: string, permission: string) => {
    setValue(
      'access_permissions',
      permissionsData.map((p) =>
        p.category === category
          ? {
              ...p,
              permissions: p.permissions.includes(permission)
                ? p.permissions.filter((perm) => perm !== permission)
                : [...p.permissions, permission],
            }
          : p,
      ),
    )
  }

  // Submit Form
  const onSubmit = (data: any) => {
    console.log('Role Created:', data)
    // Simulate API call & Redirect to roles list
    // setTimeout(() => router.push('/admin/setting/roles'), 500)
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-4'>Create New Role</h2>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Role Name */}
        <div>
          <label className='block text-sm font-medium'>Role Name</label>
          <Controller
            name='role_name'
            control={control}
            render={({ field }) => (
              <Input {...field} placeholder='Enter role name' />
            )}
          />
        </div>

        {/* Role Type */}
        <div>
          <label className='block text-sm font-medium'>Role Type</label>
          <Controller
            name='role_type'
            control={control}
            render={({ field }) => (
              <Select {...field}>
                <SelectContent>
                  {Object.values(ROLES).map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Access Permissions */}
        <div>
          <h3 className='text-lg font-semibold'>Access Permissions</h3>
          {permissionsData.map(({ category, permissions }) => (
            <Card key={category} className='mb-4'>
              <div className='flex justify-between items-center p-4 border-b'>
                <span className='text-lg font-semibold'>{category}</span>
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
              <div className='p-4 grid grid-cols-2 gap-2'>
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
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-4'>
          <Button
            variant='outline'
            onClick={() => router.push('/admin/settings/role-management')}
          >
            Cancel
          </Button>
          <Button type='submit' className='bg-blue-600 text-white'>
            Create Role
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CreateRole
