"use client"

import React, { useMemo } from 'react'
import { useId } from 'react'
import clsx from 'clsx'

export const Grid = ({
  data = [],
  item_renderer,
  container_styles = '',
  item_styles = '',
  sort_by = 'priority',
}: {
  data: any[]
  item_renderer: (item: any) => React.ReactNode
  container_styles?: string
  item_styles?: string
  sort_by?: string
}) => {
  const sorted_data = [...data].sort((a, b) =>
    sort_by in a && sort_by in b ? a[sort_by] - b[sort_by] : 0,
  )

  const default_item_styles =
    'bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white'

  return (
    <div
      className={clsx(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-5 max-w-7xl mx-auto p-4',
        container_styles,
      )}
    >
      {sorted_data.map((item, index) => (
        <div
          key={item.id || index}
          className={clsx(
            'relative p-6 rounded-3xl overflow-hidden',
            default_item_styles,
            item_styles,
          )}
        >
          <GridBackground />
          {item_renderer(item)}
        </div>
      ))}
    </div>
  )
}

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: {
  width: number
  height: number
  x?: string
  y?: string
  squares?: number[][]
  [key: string]: any
}) {
  const patternId = useId()

  return (
    <svg aria-hidden='true' {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits='userSpaceOnUse'
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill='none' />
        </pattern>
      </defs>
      <rect
        width='100%'
        height='100%'
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className='overflow-visible'>
          {squares.map(([x, y], index) => (
            <rect
              strokeWidth='0'
              key={`${x}-${y}-${index}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  )
}

export const GridBackground = ({
  pattern,
  size,
}: {
  pattern?: number[][]
  size?: number
}) => {
  const p = useMemo(() => {
    if (pattern) return pattern
  
    return Array.from({ length: 5 }, () => [
      Math.floor(Math.random() * 4) + 7,
      Math.floor(Math.random() * 6) + 1,
    ])
  }, [pattern])

  return (
    <div className='pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]'>
      <div className='absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100'>
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x='-12'
          y='4'
          squares={p}
          className='absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10'
        />
      </div>
    </div>
  )
}
