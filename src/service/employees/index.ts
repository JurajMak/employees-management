import axios from 'axios';
import { EmployeesResponse, Employee } from '../models/employees';

export class Employees {
  private static endPoint = 'http://localhost:8000/api/employees';

  public static async getEmployees(pageParam: number = 1, searchQuery: string = ''): Promise<EmployeesResponse> {
    try {
      const url = new URL(this.endPoint);

      if (searchQuery) {
        url.searchParams.append('search', searchQuery);
      } else {
        url.searchParams.append('page', pageParam.toString());
      }

      const response = await axios.get<EmployeesResponse>(url.toString());

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP error! Status: ${error.response?.status}`);
      } else {
        throw new Error(`Unexpected error: ${error}`);
      }
    }
  }

  public static async getEmployeesPage(page: number): Promise<EmployeesResponse> {
    try {
      const response = await axios.get<EmployeesResponse>(this.endPoint, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP error! Status: ${error.response?.status}`);
      } else {
        throw new Error(`Unexpected error: ${error}`);
      }
    }
  }
  public static async getAllEmployees(): Promise<Employee[]> {
    try {
      const firstPage = await this.getEmployeesPage(1);
      const totalPages = firstPage.last_page;
      const pages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);

      const promises = pages.reduce<Promise<EmployeesResponse>[]>((acc, page) => {
        acc.push(this.getEmployeesPage(page));
        return acc;
      }, []);

      const results = await Promise.all(promises);
      const data = results.flatMap((res) => res.data).concat(firstPage.data);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP error! Status: ${error.response?.status}`);
      } else {
        throw new Error(`Unexpected error: ${error}`);
      }
    }
  }
}
