import { useAllEmployees } from '@/service/queries/useEmployees';
import React from 'react';

const OrganizationDiagram: React.FC = () => {
  const { data, isLoading, isSuccess } = useAllEmployees();

  // console.log('DATA', data);

  return (
    <div>
      {isSuccess &&
        data?.map((item) => (
          <div key={item.id}>
            {item.manager_id} {item.position}
          </div>
        ))}
    </div>
  );
};

export default OrganizationDiagram;
