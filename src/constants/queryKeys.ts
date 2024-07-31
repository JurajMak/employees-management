export const QUERY_KEYS = {
  EMPLOYEES: (searchQuery: string) => ['employees-search', searchQuery],
} as const;
