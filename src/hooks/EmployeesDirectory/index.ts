import { QUERY_KEYS } from '@/constants';
import { Service } from '@/service';
import { EmployeesResponse } from '@/service/models/employees';
import { keepPreviousData, useInfiniteQuery, useQuery } from '@tanstack/react-query';

export function useEmployees(searchQuery: string, options?: any) {
  return useQuery<EmployeesResponse>({
    queryKey: QUERY_KEYS.EMPLOYEES(searchQuery),
    queryFn: () => Service.Employees.searchEmployees(searchQuery),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useGetEmployees(pageParam: number, searchQuery: string, options?: any) {
  return useQuery({
    queryKey: QUERY_KEYS.GET_EMPLOYEES(pageParam, searchQuery),
    queryFn: () => Service.Employees.getEmployees(pageParam, searchQuery),
    ...options,
  });
}

export function useEmployeesLazyLoading(searchQuery: string) {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.EMPLOYEES(searchQuery),
    queryFn: ({ pageParam = 1 }) => Service.Employees.getEmployeesLazyLoading(pageParam, searchQuery),
    placeholderData: keepPreviousData,
    getNextPageParam: (lastPage) => {
      return lastPage.current_page < lastPage.last_page ? lastPage.current_page + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.current_page > 1 ? firstPage.current_page - 1 : undefined;
    },
    initialPageParam: 1,
  });
}
