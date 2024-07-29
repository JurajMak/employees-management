import { EmployeesTable } from '@/components/EmployeesTable/EmployeesTable';
import { SearchBar } from '@/components/SearchBar';
import { useEmployees } from '@/hooks/EmployeesDirectory';

import React from 'react';

const EmployeesDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { data: searchData, isSuccess } = useEmployees(searchQuery, {
    enabled: !!searchQuery,
  });

  console.log(searchData?.data);
  return (
    <div className="container mb-12">
      <SearchBar initialValue="" onChange={setSearchQuery} />

      <div className="mt-6">{isSuccess && <EmployeesTable data={searchData?.data} />}</div>
    </div>
  );
};

export default EmployeesDirectory;
