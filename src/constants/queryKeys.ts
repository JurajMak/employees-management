export const QUERY_KEYS = {
  EMPLOYEES: (searchQuery: string) => ['employeesSearch', searchQuery],
} as const;
