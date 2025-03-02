import React from 'react'
import * as Icons from '@/lib/icons' 
import clsx from 'clsx'

interface IconComponentProps {
  iconName: string
  className?: string
  onClick?: () => void
}

const IconComponent: React.FC<IconComponentProps> = ({
  iconName,
  className,
  onClick,
  ...props
}: any) => {
  const Icon = (Icons as Record<string, React.FC>)[iconName]

  if (!Icon) {
    console.error(`Icon with name "${iconName}" not found.`)
    return null
  }

  return (
    <Icon
      className={clsx(
        'w-6 h-6 text-primary-text',
        className,
      )}
      onClick={onClick}
      {...props}
    />
  )
}

export default IconComponent
