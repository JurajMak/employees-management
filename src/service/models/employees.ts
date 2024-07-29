export type Employees = {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  contactNumber: string;
  address: string;
  about: string;
  imageUrl: string;
  created_at: string;
  updated_at: string;
  manager_id: number | null;
};

export type EmployeesResponse = {
  current_page: number;
  data: any;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: any[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type EmployeesResponseInfinite = {
  data: Employees[];
  nextPageUrl: string | null;
  prevPageUrl: string | null;
};
