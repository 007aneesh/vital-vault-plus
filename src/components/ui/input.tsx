import * as React from 'react'

import { cn } from '@/lib/utils'
import { FileUpload } from './file-upload'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  handleFileUpload?: (files: File[]) => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, handleFileUpload, ...props }, ref) => {
    if (type === 'checkbox') {
      return (
        <input
          type='checkbox'
          className={cn(
            'h-4 w-4 rounded border border-input bg-background text-primary shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      )
    }

     if (type === 'radio') {
       return (
         <input
           type='radio'
           className={cn(
             'h-4 w-4 rounded-full border border-input bg-background text-primary shadow-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
             className,
           )}
           ref={ref}
           {...props}
         />
       )
     }

    if (type === 'file') {
      return (
        <div className='file-upload-wrapper'>
          <FileUpload onChange={handleFileUpload} />
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
