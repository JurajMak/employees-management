import axios, { AxiosInstance } from 'axios';
import { EmployeesResponse, Employee } from '../models/employees';

export class Employees {
  private static axiosInstance: AxiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  public static async getEmployees(pageParam: number = 1, searchQuery: string = ''): Promise<EmployeesResponse> {
    try {
      const response = await this.axiosInstance.get<EmployeesResponse>('/employees', {
        params: {
          page: pageParam,
          search: searchQuery || undefined,
        },
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
      const firstPage = await this.getEmployees(1);
      const totalPages = firstPage.last_page ?? 1;
      const pages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);

      const promises = pages.reduce<Promise<EmployeesResponse>[]>((acc, page) => {
        acc.push(this.getEmployees(page));
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
