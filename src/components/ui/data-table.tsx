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
import { CSSProperties } from 'react'
import { useState, useEffect } from 'react'
import { Input } from './input'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select'
    pinned?: 'left' | 'right' | 'false'
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  fetchMoreData?: () => void // Function to load more data
  hasMoreData?: boolean // Indicator if more data is available
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

  if (isHeader) return 'bg-[#DFE5EC]'
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
    getCoreRowModel: getCoreRowModel(),
    enablePinning: true,
    initialState: {
      columnPinning: initialPinningState,
    },
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
  })

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
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
    <div
      className='rounded-md shadow-2xl bg-white shadow-gray-400 overflow-auto h-[85vh]'
      onScroll={handleScroll}
    >
      <Table className='overflow-auto table-auto w-full'>
        <TableHeader className='sticky top-0 z-10 bg-dashboard-background'>
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
                    <div className='flex flex-col'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {header.column.getCanFilter() && (
                        <Input
                          type='text'
                          value={
                            (table
                              .getState()
                              .columnFilters.find(
                                (filter) => filter.id === header.column.id,
                              )?.value as string) || ''
                          }
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                          className='my-2 border rounded-md h-7'
                        />
                      )}
                    </div>
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className=' border-spacing-10'>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row, index) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={`cursor-pointer group hover:bg-muted h-16 overflow-hidden whitespace-nowrap truncate`}
                onClick={() => onRowClick?.(row.original)}
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
    </div>
  )
}
