import { QUERY_KEYS } from '@/constants';
import { Service } from '@/service';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';

export function useEmployees(searchQuery: string) {
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
