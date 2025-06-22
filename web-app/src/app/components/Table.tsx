"use client"

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table"
import { useEffect, useState } from "react"
import Button from "./Button"

interface DataTableProps<T> {
  columns: ColumnDef<T>[]
  fetchData: (query: { page: number; search: string; filter: Record<string, string> }) => Promise<{
    data: T[]
    total: number
  }>
  enableEdit?: (row: T) => void
  enableDelete?: (id: number) => void // removed string type here...
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  fetchData,
  enableEdit,
  enableDelete,
}: DataTableProps<T>) {
  const [data, setData] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)


  useEffect(() => {
    const load = async () => {
      const res = await fetchData({ page, search: "", filter: {} })
      setData(res.data)
      setTotal(res.total)
    }
    load()
  }, [page, fetchData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / 10),
  })

  return (
    <div className="p-4">
      <table className="w-full border">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="border p-2 bg-gray-100 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
              {(enableEdit || enableDelete) && <th className="border p-2">Actions</th>}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="border p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
              {(enableEdit || enableDelete) && (
                <td className="border p-2 space-x-2">
                  {enableEdit && (
                    <Button 
                      tag ={"Edit"}
                      onClick={() => enableEdit(row.original)} 
                    />
                  )}
                  {enableDelete && (
                    <Button 
                      tag="Delete"
                      onClick={() => enableDelete(row.original.id)} 
                    />
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4 items-center">
        <Button 
          tag={"Previous"}
          onClick={() => setPage(p => Math.max(p - 1, 1))} 
          disabled={page === 1}
        />
        <span>Page {page} of {Math.ceil(total / 10)}</span>
        <Button 
          className="disabled"
          tag={"Next"}
          onClick={() => setPage(p => p + 1)} disabled={page >= Math.ceil(total / 10)}
        />
      </div>
    </div>
  )
}
