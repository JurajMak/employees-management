import { flexRender, getCoreRowModel, SortingState, useReactTable, VisibilityState } from '@tanstack/react-table';
import React, { lazy, Suspense } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../Table';
import { Employees } from '@/service/employees';
import { debounce } from '@/utils/debounce';
import { Employee } from '@/service/models/employees';
import { createEmployeeColumns } from './tableColumns';
import { Skeleton } from '../Skeleton';

const EmployeeModal = lazy(() => import('../EmployeeModal/EmployeeModal'));

export default function EmployeesTable({
  data,
  fetchNextPage,
  hasNextPage,
  isLoading,
}: {
  data: Employees[];
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
}) {
  // const [sorting, setSorting] = React.useState<SortingState>([]);
  // const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  // const [rowSelection, setRowSelection] = React.useState({});
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const columnsData = createEmployeeColumns(handleOpenModal);

  function handleOpenModal(employee: Employee) {
    if (employee) {
      setSelectedEmployee(employee);
    }

    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setSelectedEmployee(null);
    setIsModalOpen(false);
  }

  const tableData = React.useMemo(() => (isLoading ? Array(10).fill({}) : data), [isLoading, data]);

  const tableColumns = React.useMemo(
    () =>
      isLoading
        ? columnsData.map((column) => ({
            ...column,
            cell: () => <Skeleton className="h-8 m-2 " />,
          }))
        : columnsData,
    [isLoading],
  );

  const table = useReactTable({
    data: tableData,
    columns: tableColumns,
    // state: {
    //   sorting,
    //   columnVisibility,
    //   rowSelection,
    // },
    // onSortingChange: setSorting,
    // onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleScroll = React.useCallback(
    debounce(() => {
      if (!tableContainerRef.current || !hasNextPage) return;

      const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;

      if (scrollTop + clientHeight >= scrollHeight - 10) {
        fetchNextPage();
      }
    }, 200),
    [fetchNextPage, hasNextPage],
  );

  React.useEffect(() => {
    if (tableContainerRef.current) {
      tableContainerRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableContainerRef.current) {
        tableContainerRef.current?.removeEventListener('scroll', handleScroll);
        handleScroll.cancel();
      }
    };
  }, [handleScroll]);

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
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isModalOpen && (
        <Suspense fallback={null}>
          <EmployeeModal isOpened={isModalOpen} handleClose={handleCloseModal} employee={selectedEmployee} />
        </Suspense>
      )}
    </div>
  );
}
