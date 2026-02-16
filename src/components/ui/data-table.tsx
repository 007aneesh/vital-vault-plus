/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
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
import {
  CSSProperties,
  InputHTMLAttributes,
  UIEventHandler,
  useMemo,
  useCallback,
  memo,
  useRef,
  useEffect,
  useState,
} from 'react'
import { Input } from './input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'
import { Button } from './button'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue> {
    filterVariant?: 'text' | 'range' | 'select' | 'number'
    pinned?: 'left' | 'right' | false
    filters?: boolean
    className?: string
  }
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onSortChange?: (sortModel: { sort_by: string; type: 'asc' | 'desc' } | null) => void
  onFilterChange?: (filterModel: Record<string, any>) => void
  onRowClick?: (rowData: TData) => void
  currentSort?: { sort_by: string; type: 'asc' | 'desc' } | null
  enableRowSelection?: boolean
  enableColumnPinning?: boolean
  enableColumnReordering?: boolean
  enableColumnFilters?: boolean
  enableGlobalFilter?: boolean
  onRowSelectionChange?: (selectedRows: TData[]) => void
  totalRows?: number
  pageSize?: number
  onPageChange?: (page: number) => void
  currentPage?: number
  isLoading?: boolean
  enableInfiniteScroll?: boolean
  onLoadMore?: () => void
  hasMore?: boolean
  toolbar?: React.ReactNode
  emptyState?: React.ReactNode
}

const getCommonPinningStyles = (
  column: any,
  type: 'header' | 'cell',
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
    width: `${column.getSize()}px`,
    minWidth: `${column.getSize()}px`,
    maxWidth: `${column.getSize()}px`,
    zIndex: isPinned ? 2 : 0,
  }
}

const getBackgroundClass = (column: any, type: 'header' | 'cell', isSelected?: boolean): string => {
  const isPinned = column.getIsPinned()
  const isHeader = type === 'header'

  if (!isPinned) return ''

  if (isHeader) return 'bg-[#c4d0de]'
  
  // For cells, handle selection state
  if (isSelected) {
    return 'bg-muted'
  }
  return 'bg-white group-hover:bg-muted'
}

// Sort indicator component
const SortIndicator = ({ 
  isSorted 
}: { 
  isSorted: false | 'asc' | 'desc'
}) => {
  if (isSorted === 'asc') {
    return <span className='text-xs ml-2'>▲</span>
  }
  if (isSorted === 'desc') {
    return <span className='text-xs ml-2'>▼</span>
  }
  return <span className='text-xs ml-2 opacity-30'>⇅</span>
}

// Column header with sorting
const DataTableColumnHeader = ({ 
  column, 
  title,
  className 
}: { 
  column: Column<any, unknown>
  title: string
  className?: string
}) => {
  if (!column.getCanSort()) {
    return <div className={className}>{title}</div>
  }

  const handleClick = () => {
    if (column.getIsSorted() === 'asc') {
      column.toggleSorting(true)
    } else if (column.getIsSorted() === 'desc') {
      column.clearSorting()
    } else {
      column.toggleSorting(false)
    }
  }

  return (
    <div 
      className={`flex items-center gap-2 cursor-pointer select-none hover:text-primary ${className || ''}`}
      onClick={handleClick}
    >
      <span>{title}</span>
      <SortIndicator isSorted={column.getIsSorted()} />
    </div>
  )
}

// Filter component
const Filter = memo(({ column }: { column: Column<any, unknown> }) => {
  const { filterVariant } = column.columnDef.meta ?? {}
  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      filterVariant === 'range'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys())
            .sort()
            .slice(0, 5000),
    [column, filterVariant],
  )

  if (filterVariant === 'range') {
    return (
      <div className='flex space-x-2'>
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min`}
          className='w-20 h-7 text-xs'
        />
        <DebouncedInput
          type='number'
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max`}
          className='w-20 h-7 text-xs'
        />
      </div>
    )
  }

  if (filterVariant === 'select') {
    return (
      <Select
        onValueChange={(value) =>
          column?.setFilterValue(value === 'all' ? '' : value)
        }
        value={columnFilterValue?.toString() || 'all'}
      >
        <SelectTrigger className='h-7 text-xs'>
          <SelectValue placeholder='All' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='all'>All</SelectItem>
            {sortedUniqueValues?.map((value: any) => (
              <SelectItem value={value} key={value}>
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    )
  }

  return (
    <DebouncedInput
      type='text'
      value={(columnFilterValue ?? '') as string}
      onChange={(value) => column.setFilterValue(value)}
      placeholder='Search...'
      className='w-full h-7 text-xs'
    />
  )
})

// Debounced input
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
  }, [value, debounce, onChange])

  return (
    <Input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

// Column visibility toggle
const DataTableViewOptions = ({ table }: { table: any }) => {
  const [showOptions, setShowOptions] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowOptions(false)
      }
    }

    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showOptions])

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="outline" 
        size="sm" 
        className="ml-auto h-8"
        onClick={() => setShowOptions(!showOptions)}
      >
        <span className="mr-2">⚙️</span>
        Columns
      </Button>
      {showOptions && (
        <div className="absolute right-0 top-10 z-50 min-w-[180px] rounded-md border bg-white p-2 shadow-lg">
          <div className="mb-2 px-2 text-sm font-semibold">Toggle columns</div>
          <div className="border-t my-2" />
          {table
            .getAllColumns()
            .filter(
              (column: any) =>
                typeof column.accessorFn !== 'undefined' && column.getCanHide()
            )
            .map((column: any) => {
              const isVisible = column.getIsVisible()
              return (
                <label
                  key={column.id}
                  className="flex items-center space-x-2 px-2 py-1.5 text-sm hover:bg-gray-100 rounded cursor-pointer capitalize"
                >
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={(e: any) => {
                      column.toggleVisibility(e.target.checked)
                    }}
                    className="rounded cursor-pointer"
                  />
                  <span>{column.id}</span>
                </label>
              )
            })}
        </div>
      )}
    </div>
  )
}

// Main DataTable component
export function DataTable<TData, TValue>({
  columns,
  data,
  onSortChange,
  onFilterChange,
  onRowClick,
  currentSort,
  enableRowSelection = false,
  enableColumnPinning = true,
  enableColumnReordering = true,
  enableColumnFilters = true,
  enableGlobalFilter = false,
  onRowSelectionChange,
  totalRows,
  pageSize = 50,
  onPageChange,
  currentPage = 0,
  isLoading = false,
  enableInfiniteScroll = false,
  onLoadMore,
  hasMore = false,
  toolbar,
  emptyState,
}: DataTableProps<TData, TValue>) {
  const tableRef = useRef<HTMLDivElement>(null)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>({})
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([])
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({})
  const [globalFilter, setGlobalFilter] = useState('')

  // Initialize column order and pinning from column definitions
  useEffect(() => {
    const initialOrder = columns.map((col: any) => col.id || col.accessorKey)
    setColumnOrder(initialOrder)

    const initialPinning = columns.reduce<{ left: string[]; right: string[] }>(
      (acc, col: any) => {
        const pinned = col.meta?.pinned
        const colId = col.id || col.accessorKey
        if (pinned === 'left' && colId) acc.left.push(colId)
        if (pinned === 'right' && colId) acc.right.push(colId)
        return acc
      },
      { left: [], right: [] }
    )
    setColumnPinning(initialPinning)
  }, [columns])

  // Sync sorting with external state
  useEffect(() => {
    if (currentSort) {
      setSorting([{ id: currentSort.sort_by, desc: currentSort.type === 'desc' }])
    } else {
      setSorting([])
    }
  }, [currentSort])

  // Handle sorting change
  const handleSortingChange = useCallback((updaterOrValue: any) => {
    setSorting(updaterOrValue)
    
    const newSorting = typeof updaterOrValue === 'function' 
      ? updaterOrValue(sorting) 
      : updaterOrValue

    if (onSortChange) {
      if (newSorting.length > 0) {
        const sort = newSorting[0]
        onSortChange({
          sort_by: sort.id,
          type: sort.desc ? 'desc' : 'asc'
        })
      } else {
        onSortChange(null)
      }
    }
  }, [sorting, onSortChange])

  // Handle filter change
  useEffect(() => {
    if (onFilterChange && columnFilters.length > 0) {
      const filterModel = columnFilters.reduce((acc: any, filter) => {
        acc[filter.id] = filter.value
        return acc
      }, {})
      onFilterChange(filterModel)
    }
  }, [columnFilters, onFilterChange])

  // Handle row selection change
  useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = Object.keys(rowSelection)
        .filter(key => rowSelection[key])
        .map(key => data[parseInt(key)])
        .filter(Boolean)
      onRowSelectionChange(selectedRows)
    }
  }, [rowSelection, data, onRowSelectionChange])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnPinning: enableColumnPinning ? columnPinning : undefined,
      columnOrder: enableColumnReordering ? columnOrder : undefined,
      columnSizing,
      globalFilter: enableGlobalFilter ? globalFilter : undefined,
    },
    enableRowSelection: enableRowSelection,
    enableColumnPinning: enableColumnPinning,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onColumnPinningChange: setColumnPinning,
    onColumnOrderChange: setColumnOrder,
    onColumnSizingChange: setColumnSizing,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableColumnFilters ? getFilteredRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualSorting: !!onSortChange,
    manualFiltering: !!onFilterChange,
    manualPagination: !!onPageChange,
    pageCount: totalRows ? Math.ceil(totalRows / pageSize) : -1,
    defaultColumn: {
      size: 150,
      minSize: 120,
      maxSize: 500,
    },
  })

  // Infinite scroll handler
  const handleScroll: UIEventHandler<HTMLDivElement> = useCallback((e) => {
    if (!enableInfiniteScroll || !onLoadMore || !hasMore || isLoading) return

    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop <= clientHeight * 1.2) {
      onLoadMore()
    }
  }, [enableInfiniteScroll, onLoadMore, hasMore, isLoading])

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {enableGlobalFilter && (
            <Input
              placeholder="Search all columns..."
              value={globalFilter ?? ''}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="h-8 w-[150px] lg:w-[250px]"
            />
          )}
          {toolbar}
        </div>
        <div className="flex items-center space-x-2">
          <DataTableViewOptions table={table} />
        </div>
      </div>

      {/* Table */}
      <div 
        ref={tableRef}
        className="relative rounded-md border overflow-auto max-h-[600px]"
        onScroll={handleScroll}
      >
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-[#c4d0de]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort()
                  const canFilter = header.column.getCanFilter() && 
                    header.column.columnDef.meta?.filters !== false
                  const canReorder = enableColumnReordering && !header.column.getIsPinned()

                  return (
                    <TableHead
                      key={header.id}
                      className={`font-semibold py-2 relative ${getBackgroundClass(header.column, 'header')}`}
                      style={{
                        ...getCommonPinningStyles(header.column, 'header'),
                      }}
                      onDragOver={(e) => {
                        if (canReorder) {
                          e.preventDefault()
                          e.dataTransfer.dropEffect = 'move'
                        }
                      }}
                      onDrop={(e) => {
                        if (canReorder) {
                          e.preventDefault()
                          const draggedColumnId = e.dataTransfer.getData('text/plain')
                          const targetColumnId = header.column.id
                          
                          if (draggedColumnId !== targetColumnId) {
                            const currentOrder = table.getState().columnOrder
                            const draggedIndex = currentOrder.indexOf(draggedColumnId)
                            const targetIndex = currentOrder.indexOf(targetColumnId)
                            
                            if (draggedIndex !== -1 && targetIndex !== -1) {
                              const newOrder = [...currentOrder]
                              newOrder.splice(draggedIndex, 1)
                              newOrder.splice(targetIndex, 0, draggedColumnId)
                              table.setColumnOrder(newOrder)
                            }
                          }
                        }
                      }}
                    >
                      <div className={`flex flex-col space-y-2 ${header.id === 'select' ? 'items-center' : ''}`}>
                        {header.isPlaceholder ? null : (
                          <>
                            <div className="flex items-center gap-1 w-full">
                              {canReorder && (
                                <span 
                                  className="cursor-move text-gray-400 hover:text-gray-600 px-1" 
                                  title="Drag to reorder"
                                  draggable
                                  onDragStart={(e) => {
                                    e.stopPropagation()
                                    e.dataTransfer.effectAllowed = 'move'
                                    e.dataTransfer.setData('text/plain', header.column.id)
                                  }}
                                >
                                  ⋮⋮
                                </span>
                              )}
                              {canSort ? (
                                <DataTableColumnHeader
                                  column={header.column}
                                  title={flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  ) as string}
                                />
                              ) : (
                                <div>
                                  {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                                </div>
                              )}
                            </div>
                            {enableColumnFilters && canFilter && (
                              <Filter column={header.column} />
                            )}
                          </>
                        )}
                      </div>
                      {/* Column Resizer */}
                      {header.column.getCanResize() && (
                        <div
                          onMouseDown={(e) => {
                            e.stopPropagation()
                            header.getResizeHandler()(e)
                          }}
                          onTouchStart={(e) => {
                            e.stopPropagation()
                            header.getResizeHandler()(e)
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className={`absolute right-0 top-0 h-full w-[3px] cursor-col-resize select-none touch-none hover:bg-blue-400 ${
                            header.column.getIsResizing() ? 'bg-blue-500' : 'bg-transparent'
                          }`}
                        />
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex items-center justify-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={`group hover:bg-muted ${
                    onRowClick ? 'cursor-pointer' : ''
                  } ${row.getIsSelected() ? 'bg-muted' : ''}`}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={getBackgroundClass(cell.column, 'cell', row.getIsSelected())}
                      style={{
                        ...getCommonPinningStyles(cell.column, 'cell'),
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyState || 'No results.'}
                </TableCell>
              </TableRow>
            )}
            {enableInfiniteScroll && hasMore && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-12 text-center">
                  <div className="flex items-center justify-center">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {enableRowSelection && (
            <>
              {table.getFilteredSelectedRowModel().rows.length} of{' '}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </>
          )}
          {totalRows && (
            <span className="ml-4">
              Total: {totalRows} row(s)
            </span>
          )}
        </div>
        {!enableInfiniteScroll && onPageChange && (
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <span className="text-sm">{pageSize}</span>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {currentPage + 1} of {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(0)}
                disabled={currentPage === 0}
              >
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= table.getPageCount() - 1}
              >
                Next
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(table.getPageCount() - 1)}
                disabled={currentPage >= table.getPageCount() - 1}
              >
                Last
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
