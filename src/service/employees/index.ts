import { EmployeesResponse, EmployeesResponseInfinite } from '../models/employees';

export class Employees {
  private static endPoint = 'http://localhost:8000/api/employees';

  public static async searchEmployees(searchQuery = ''): Promise<EmployeesResponse[]> {
    try {
      const response = await fetch(`${this.endPoint}?search=${searchQuery}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }
  // test function
  public static async getEmployees(pageParam: number = 1, searchQuery: string = ''): Promise<EmployeesResponse[]> {
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

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  public static async getEmployeesLazyLoading(pageParam: number = 1, searchQuery: string = ''): Promise<any> {
    try {
      // const response = await fetch(`${this.endPoint}?page=${pageParam}`);
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

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }
}
