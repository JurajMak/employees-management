import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../Button';
import { Employee } from '@/service/models/employees';

export function createEmployeeColumns(handleOpenModal: (employee: Employee) => void): ColumnDef<Employee>[] {
  return [
    {
      accessorKey: 'id',
      header: '#',
      cell: (info) => <div>{info.getValue() as number}</div>,
      enableSorting: true,
    },
    {
      accessorKey: 'imageUrl',
      header: 'Image',
      cell: ({ row }) => (
        <img
          src={row.getValue('imageUrl')}
          alt={`${row.getValue('firstName')}`}
          className="inline-block w-16 h-16 rounded-full object-cover"
        />
      ),
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
      cell: ({ row }) => <div className="font-semibold">{row.getValue('firstName')}</div>,
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      cell: ({ row }) => <div className="font-semibold">{row.getValue('lastName')}</div>,
    },
    {
      accessorKey: 'position',
      header: 'Position',
      cell: ({ row }) => <div className="font-semibold">{row.getValue('position')}</div>,
    },
    {
      id: 'details',
      header: 'Employee info',
      cell: ({ row }) => (
        <Button variant="link" onClick={() => handleOpenModal(row.original)}>
          Details
        </Button>
      ),
    },
  ];
}
