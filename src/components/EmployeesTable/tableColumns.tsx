import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../Button';
import { Employees } from '@/service/employees';

export const EMPLOYEES_COLUMNS: ColumnDef<Employees>[] = [
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
        className="inline-block w-12 h-12 rounded-full object-cover "
      />
    ),
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    cell: ({ row }) => <div>{row.getValue('firstName')}</div>,
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    cell: ({ row }) => <div>{row.getValue('lastName')}</div>,
  },
  {
    accessorKey: 'position',
    header: 'Position',
    cell: ({ row }) => <div>{row.getValue('position')}</div>,
  },
  {
    id: 'details',
    header: 'Employee info',
    cell: ({ row }) => (
      <Button variant="ghost" className="h-8 w-8 p-0">
        Details
      </Button>
    ),
  },
];
