import { EmployeesTable } from '@/components/EmployeesTable';
import { SearchBar } from '@/components/SearchBar';
import { useEmployees } from '@/service/queries';

import React from 'react';

const EmployeesDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data, isSuccess, fetchNextPage, hasNextPage } = useEmployees(searchQuery);

  return (
    <div className="container mb-12">
      <SearchBar initialValue="" onChange={setSearchQuery} />

      <div className="mt-6">
        <EmployeesTable
          data={(isSuccess && data?.pages.flatMap((page) => page.data)) || []}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
};

export default EmployeesDirectory;
