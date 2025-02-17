import { OrgChart } from '@/components/OrganizationChart';
import { useAllEmployees } from '@/service/queries';

import { Ellipsis } from 'lucide-react';

import React from 'react';

const OrganizationDiagram: React.FC = () => {
  const { data, isLoading, isSuccess } = useAllEmployees();

  return (
    <div>
      {!isLoading && isSuccess ? (
        <OrgChart data={data} />
      ) : (
        <div className="flex justify-center items-center h-[60dvh] w-screen">
          <Ellipsis className="animate-ping text-primary" size={150} />
        </div>
      )}
    </div>
  );
};

export default OrganizationDiagram;
