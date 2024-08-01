import { EmployeesTable } from '@/components/EmployeesTable';
import { SearchBar } from '@/components/SearchBar';
import { useEmployees } from '@/service/queries';

import React from 'react';

const EmployeesDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data, isLoading, fetchNextPage, hasNextPage } = useEmployees(searchQuery);

  return (
    <div className="container my-12">
      <SearchBar onChange={setSearchQuery} />

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
