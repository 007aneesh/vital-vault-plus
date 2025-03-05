
'use client'

import React from 'react'
import { useToastStore } from '@/store/toastStore'
import { cn } from '@/lib/utils'

const Toast = () => {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className='fixed top-4 right-4 space-y-2 z-50'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'p-4 rounded shadow-lg',
            toast.type === 'success' && 'bg-green-500 text-white',
            toast.type === 'error' && 'bg-red-500 text-white',
            toast.type === 'info' && 'bg-blue-500 text-white',
            toast.type === 'warning' && 'bg-yellow-500 text-black',
          )}
        >
          {toast.message}
          <button onClick={() => removeToast(toast.id)} className='ml-4'>
            ✖
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast
