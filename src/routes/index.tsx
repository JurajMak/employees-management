import { Layout } from '@/components/Layout';
import { ROUTES } from '@/constants';
import { EmployeesDirectory } from '@/pages/EmployeesDirectory';
import { OrganizationDiagram } from '@/pages/OrganizationDiagram';
import { Navigate, createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: ROUTES.EMPLOYEES,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <EmployeesDirectory />,
      },
      {
        path: ROUTES.ORGANIZATION,
        element: <OrganizationDiagram />,
      },
    ],
  },

  {
    path: ROUTES.NOT_FOUND,
    element: <Navigate to={ROUTES.EMPLOYEES} />,
  },
]);
