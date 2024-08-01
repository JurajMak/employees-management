import { QUERY_KEYS } from '@/constants';
import { Service } from '@/service';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export function useEmployees(searchQuery: string) {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.EMPLOYEES(searchQuery),
    queryFn: ({ pageParam = 1 }) => Service.Employees.getEmployees(pageParam, searchQuery),
    getNextPageParam: (lastPage) => {
      return lastPage.current_page < lastPage.last_page ? lastPage.current_page + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.current_page > 1 ? firstPage.current_page - 1 : undefined;
    },
    initialPageParam: 1,
  });
}

export function useAllEmployees() {
  return useQuery({
    queryKey: QUERY_KEYS.EMPLOYEES_CHART,
    queryFn: () => Service.Employees.getAllEmployees(),
  });
}
