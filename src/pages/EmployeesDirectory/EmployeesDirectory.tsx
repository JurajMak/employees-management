import { EmployeesTable } from '@/components/EmployeesTable';
import { SearchBar } from '@/components/SearchBar';
import { useEmployees } from '@/service/queries';

import React from 'react';

const EmployeesDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data, isLoading, fetchNextPage, hasNextPage } = useEmployees(searchQuery);

  // const managerId = data?.pages.flatMap((item) => item.data.map((item) => item.manager_id));
  // console.log('DATA', managerId);

  return (
    <div className="container mb-12">
      <SearchBar initialValue="" onChange={setSearchQuery} />

      <div className="mt-6">
        <EmployeesTable
          data={data?.pages.flatMap((page) => page.data) || []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default EmployeesDirectory;
