import { QUERY_KEYS } from '@/constants';
import { Service } from '@/service';
import { EmployeesResponse } from '@/service/models/employees';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export function useEmployees(searchQuery: string, options?: any) {
  return useQuery<EmployeesResponse>({
    queryKey: QUERY_KEYS.EMPLOYEES(searchQuery),
    queryFn: () => Service.Employees.searchEmployees(searchQuery),
    placeholderData: keepPreviousData,
    ...options,
  });
}
