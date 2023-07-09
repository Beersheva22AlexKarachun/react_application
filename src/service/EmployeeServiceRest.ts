import { Observable } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeeService from "./EmployeeService";

enum METHOD {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT"
}
export default class EmployeeServiceRest implements EmployeeService {
  constructor(private url: string) { }

  async addEmployee(empl: Employee): Promise<Employee> {
    let responseText = '';
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
        },
        body: JSON.stringify({ ...empl, userId: 'admin' })
      });

      if (!response.ok) {
        const { status, statusText } = response;
        responseText = status === 401 || status === 403 ? 'Authentication' : statusText;
        throw responseText;
      }
      return await response.json();

    } catch (error: any) {
      throw responseText ? responseText : "Server is unavailable. Repeat later on";
    }
  }

  getEmployees(): Observable<Employee[] | string> {
    return new Observable((subscriber) => {
      fetch(this.url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
        }
      }
      )
        .then(response => {
          let res: Promise<Employee[] | string>;
          if (response.ok) {
            res = response.json()
          } else {
            res = Promise.resolve(response.status === 401 || response.status === 403 ? "Authentication" : response.statusText)
          }
          return res

        })
        .then(data => subscriber.next(data)).catch(error => subscriber.next("Server is unavaible, repeate your request"))
    });
  }

  async deleteEmployee(id: number): Promise<Response<Employee>> {
    if ((await this.getEmployeeById(id)).status === StatusType.SUCCESS) {
      const url = this.url + `/${id}`
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
      }
      return this.getResponse(url, METHOD.DELETE, headers)
    }
    return Promise.resolve({ data: undefined, status: StatusType.WARNING, message: `Employee with id ${id} doesn't exist` })
  }

  async getEmployeeById(id: number): Promise<Response<Employee>> {
    const url = this.url + `/${id}`
    const headers = {
      Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
    }
    return await this.getResponse<Employee>(url, METHOD.GET, headers);
  }

  private async getResponse<T>(url: string, method: METHOD, headers: {}, body?: string): Promise<Response<T>> {
    const response = await fetch(url, { method, headers, body });
    const data: T = await response.json();
    const status: StatusType = response.ok ? StatusType.SUCCESS : StatusType.ERROR;
    return Promise.resolve({ data, status, message: response.statusText });
  }
  // {data: 'jwt expired', status: 'error', message: 'Unauthorized'}
}
