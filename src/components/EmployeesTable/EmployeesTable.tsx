import { flexRender, getCoreRowModel, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table';
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../Table';
import { Employees } from '@/service/employees';
import { EMPLOYEES_COLUMNS } from './tableColumns';
import { debounce } from '@/utils/debounce';

export function EmployeesTable({
  data,
  fetchNextPage,
  hasNextPage,
}: {
  data: Employees[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const columns = EMPLOYEES_COLUMNS;
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  React.useEffect(() => {
    const handleScroll = debounce(() => {
      if (!tableContainerRef.current || !hasNextPage) return;

      const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchNextPage();
      }
    }, 200);

    tableContainerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      tableContainerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="w-full">
      <div className="rounded-md border max-h-[600px] overflow-y-auto" ref={tableContainerRef}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          {/* <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={() => header.column.getToggleSortingHandler()}
                    className={header.column.getIsSorted() ? `sorted ${header.column.getIsSorted()}` : ''}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    <span>{header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽'}</span>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader> */}
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
