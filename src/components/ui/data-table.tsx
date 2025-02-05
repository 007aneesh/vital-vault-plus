/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  RowData,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'
import { CSSProperties, InputHTMLAttributes, useMemo } from 'react'
import { useState, useEffect, UIEventHandler } from 'react'
import { Input } from './input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select' | 'number'
    pinned?: 'left' | 'right' | 'false'
    filters?: boolean
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  fetchMoreData?: () => void
  hasMoreData?: boolean
  onRowClick?: (rowData: TData) => void
}

const getCommonPinningStyles = (
  column: any,
  type: any,
  index: number,
): CSSProperties => {
  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile
}

const getBackgroundClass = (column: any, type: 'header' | 'cell'): string => {
  const isPinned = column.getIsPinned()
  const isHeader = type === 'header'

  if (!isPinned) return ''

  if (isHeader) return 'bg-[#c4d0de]'
  return 'bg-white group-hover:bg-muted hover:z-1000 h-16'
}

export function DataTable<TData, TValue>({
  columns,
  data,
  fetchMoreData,
  hasMoreData,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const isMobile = useIsMobile()

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const initialPinningState = columns.reduce<{
    left: string[]
    right: string[]
  }>(
    (acc, column) => {
      const pinned = column.meta?.pinned
      const columnId = column?.id
      if (pinned === 'left' && columnId) acc.left.push(columnId)
      if (pinned === 'right' && columnId) acc.right.push(columnId)
      return acc
    },
    { left: [], right: [] },
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enablePinning: true,
    initialState: {
      columnPinning: initialPinningState,
    },
  })

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasMoreData) {
      if (fetchMoreData) fetchMoreData()
    }
  }

  useEffect(() => {
    if (isMobile) {
      table.setColumnPinning({ left: [], right: [] })
    }
  }, [isMobile, table])

  return (
    <Table
      className='relative rounded-md bg-white z-10 w-full'
      onScroll={handleScroll}
    >
      <TableHeader className='sticky top-0 z-10 bg-[#c4d0de]'>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className='hover:bg-transparent'>
            {headerGroup.headers.map((header) => {
              return (
                <TableHead
                  key={header.id}
                  className={`font-semibold py-2 ${getBackgroundClass(header.column, 'header')}`}
                  style={{
                    ...getCommonPinningStyles(header.column, 'header', 0),
                  }}
                >
                  <div className='flex flex-col items-start justify-start h-full'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    {header.column.getCanFilter() &&
                      header.column.columnDef.meta?.filters !== false && (
                        <Filter column={header.column} />
                      )}
                  </div>
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody className='border-spacing-10' style={{ tableLayout: 'fixed' }}>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && 'selected'}
              className='cursor-pointer group hover:bg-muted overflow-hidden  truncate'
              onClick={() => onRowClick?.(row.original)}
              style={{ height: 'auto' }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={`${getBackgroundClass(cell.column, 'cell')} h-16`}
                  style={{
                    ...getCommonPinningStyles(cell.column, 'cell', index),
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className='h-24 text-center'>
              No results.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

function Filter({ column }: { column: Column<any, unknown> }) {
  const { filterVariant } = column.columnDef.meta ?? {}

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      filterVariant === 'range'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000),
    [column.getFacetedUniqueValues(), filterVariant],
  )

  return filterVariant === 'range' ? (
    <div>
      <div className='flex space-x-2'>
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0] !== undefined
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className='w-24 border shadow rounded'
        />
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className='w-28 border shadow rounded'
        />
      </div>
      <div className='h-1' />
    </div>
  ) : filterVariant === 'select' ? (
    <Select
      onValueChange={(value) =>
        column?.setFilterValue(value === 'all' ? '' : value)
      }
      value={columnFilterValue?.toString() || 'all'}
    >
      <SelectTrigger className='mt-2 h-7'>
        <SelectValue placeholder='Select a Gender' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='all'>All</SelectItem>{' '}
          {sortedUniqueValues?.map((value) => (
            <SelectItem value={value} key={value}>
              {value}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ) : (
    <>
      <DebouncedInput
        type='text'
        value={(columnFilterValue ?? '') as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder='Search...'
        className='w-36 border shadow rounded'
        list={column.id + 'list'}
      />
      <div className='h-1' />
    </>
  )
}

// A typical debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className='my-2 min-w-20 border rounded-md h-7'
    />
  )
}
