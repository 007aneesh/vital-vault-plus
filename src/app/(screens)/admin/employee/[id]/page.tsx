'use client'

import { employee_management } from '@/configs/employee'
import { useToastStore } from '@/store/toastStore'
import { useEffect, useState } from 'react'
import EmployeePage from './render'

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const showToast = useToastStore((state) => state.setShowToast)

  const [data, setData] = useState<any>([])

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const response = await employee_management.getEmployeeById(id)
        setData(response?.data);
        showToast({
          message: 'Success',
          type: 'success',
        })
      } catch (error) {
        console.error('Error fetching employee:', error)
        showToast({
          message: 'Error fetching data',
          type: 'error',
        })
      }
    }
    getEmployee();
  }, [])

  return <div>
    <EmployeePage data={data} />
  </div>
}
