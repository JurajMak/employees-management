export const QUERY_KEYS = {
  EMPLOYEES: (searchQuery: string) => ['employees-search', searchQuery],
  EMPLOYEES_CHART: ['employees-chart'],
} as const;
