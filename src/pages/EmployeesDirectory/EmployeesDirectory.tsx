import { EmployeesTable } from '@/components/EmployeesTable/EmployeesTable';
import { SearchBar } from '@/components/SearchBar';
import { useEmployeesLazyLoading } from '@/hooks/EmployeesDirectory';

import React from 'react';

const EmployeesDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const { data, isSuccess, fetchNextPage, hasNextPage } = useEmployeesLazyLoading(searchQuery);
  console.log(data);
  return (
    <div className="container mb-12">
      <SearchBar initialValue="" onChange={setSearchQuery} />

      <div className="mt-6">
        {isSuccess && (
          <EmployeesTable
            data={data?.pages.flatMap((page) => page.data)}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeesDirectory;
