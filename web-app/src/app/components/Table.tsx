"use client";

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useEffect, useState, useRef } from "react";
import Button from "./Button";
import styles from './components.module.css';
import React from "react";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  fetchData: (query: { page: number; search: string; filter: Record<string, string> }) => Promise<{
    data: T[];
    total: number;
  }>;
  enableEdit?: (row: T) => void;
  enableDelete?: (id: number) => void;
}

export default function DataTable<T extends { id: string | number }>({
  columns,
  fetchData,
  enableEdit,
  enableDelete,
}: DataTableProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const load = async () => {
      const res = await fetchData({ page, search: "", filter: {} });
      setData(res.data);
      setTotal(res.total);
    };
    load();
  }, [page, fetchData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(total / 10),
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className={styles.dataTable}>
      <div className={styles.tableWrapper}>
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={styles.dragScroll}
        >
          <table className={styles.table}>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className={styles.th}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                  {(enableEdit || enableDelete) && <th className={styles.th}>Actions</th>}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={styles.tr}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className={styles.td}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                  {(enableEdit || enableDelete) && (
                    <td className={styles.td}>
                      {enableEdit && (
                        <Button tag="Edit" onClick={() => enableEdit(row.original)} />
                      )}
                      {enableDelete && (
                        <Button
                          tag="Delete"
                          onClick={() =>
                            typeof row.original.id === "number" && enableDelete(row.original.id)
                          }
                        />
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles.dataTableButtons}>
        <Button
          tag="Previous"
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
        />
        <span className={styles.paginationText}>
          Page {page} of {Math.ceil(total / 10)}
        </span>
        <Button
          tag="Next"
          onClick={() => setPage(p => p + 1)}
          disabled={page >= Math.ceil(total / 10)}
        />
      </div>
    </div>
  );
}
