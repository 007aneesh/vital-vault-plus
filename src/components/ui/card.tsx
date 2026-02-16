import { cn } from '@/lib/utils'
import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  noHover?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          'rounded-lg shadow-md p-4 transition-transform transform focus-within:scale-105 focus:outline-none',
          className,
          props.noHover ? '' : 'hover:scale-105'
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  },
)

Card.displayName = 'Card'

export { Card }
