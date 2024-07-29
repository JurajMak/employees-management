import { EmployeesResponse } from '../models/employees';

export class Employees {
  private static endPoint = 'http://localhost:8000/api/employees';

  public static async getEmployeesLazyLoading(
    pageParam: number = 1,
    searchQuery: string = '',
  ): Promise<EmployeesResponse> {
    try {
      const url = new URL(this.endPoint);

      if (searchQuery) {
        url.searchParams.append('search', searchQuery);
      } else {
        url.searchParams.append('page', pageParam.toString());
      }

      const response = await fetch(url.toString());

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: EmployeesResponse = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
}
