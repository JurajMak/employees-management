import { OrgChart } from '@/components/OrganizationChart';
import { useAllEmployees } from '@/service/queries/useEmployees';

import React from 'react';

const OrganizationDiagram: React.FC = () => {
  const { data, isLoading, isSuccess } = useAllEmployees();

  return <div>{!isLoading && <OrgChart data={isSuccess ? data : []} isSuccess={isSuccess} />}</div>;
};

export default OrganizationDiagram;
