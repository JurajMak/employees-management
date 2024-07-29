export const ROUTES = {
  EMPLOYEES: '/',
  ORGANIZATION: '/organization',
  NOT_FOUND: '*',
} as const;

export const QUERY_KEYS = {
  EMPLOYEES: (searchQuery: string) => ['employeesSearch', searchQuery],
} as const;
