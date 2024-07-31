export type Employee = {
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

type Links = {
  url: string | null;
  label: string;
  active: boolean;
};

export type Response<T> = {
  current_page: number;
  data: T;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Links[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type EmployeesResponse = Response<Employee[]>;
