'use client'

import { useToastStore } from '@/store/toastStore'
import EmployeePage from './render'
import useSWR from 'swr'
import { employee_management } from '@/configs/employee'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const showToast = useToastStore((state) => state.showToast)

  const { data: response, error, isLoading } = useSWR(
    id ? ['employee', id] : null,
    () => employee_management.getEmployeeById(id),
    {
      onError: () => {
        showToast({ message: 'Error fetching data', type: 'error' })
      },
    },
  )

  const data = response?.data ?? response

  if (error && !data) {
    return (
      <div className="flex items-center justify-center py-12 text-red-600">
        Failed to load employee. Please try again.
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-secondary border-t-transparent" />
      </div>
    )
  }

  return (
    <div>
      <EmployeePage data={data} />
    </div>
  )
}
