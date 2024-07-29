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

  public static async getEmployeesLazyLoading(pageParam: number = 1): Promise<EmployeesResponseInfinite> {
    try {
      const response = await fetch(`${this.endPoint}?page=${pageParam}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return {
        data,
        nextPageUrl: data.next_page_url,
        prevPageUrl: data.prev_page_url,
      };
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }
}

// const response = await fetch(`${this.endPoint}?search=${searchQuery}&page=${pageParam}`);
