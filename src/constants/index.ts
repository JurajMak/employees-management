export const ROUTES = {
  EMPLOYEES: '/',
  ORGANIZATION: '/organization',
  NOT_FOUND: '*',
} as const;

export const QUERY_KEYS = {
  EMPLOYEES: (searchQuery: string) => ['employeesSearch', searchQuery],
  GET_EMPLOYEES: (pageParam: number, searchQuery: string) => ['employees', pageParam, searchQuery],
} as const;
