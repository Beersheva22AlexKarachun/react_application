import { Observable } from "rxjs";
import Employee from "../model/Employee";
import { AUTH_DATA_JWT } from "./AuthServiceJwt";
import EmployeeService from "./EmployeeService";
import StatisticsType from "../model/StatisticsType";
import Response from "../model/Response";
import StatusType from "../model/StatusType";

enum METHOD {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PUT = "PUT"
}
export default class EmployeeServiceRest implements EmployeeService {
  constructor(private url: string) { }

  private countByField(array: any[], field: string, interval: number): Map<number, number> {
    const res = array.reduce((res, empl) => {
      const index = Math.trunc(empl[field] / interval);
      res[index] = (res[index] ?? 0) + 1;
      return res;
    }, {});
    return res;
  }

  async getStatistics(field: string, interval: number): Promise<StatisticsType[]> {
    let employees: any[] = await fetch(this.url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_DATA_JWT) || ''}`
      }
    }).then(response => response.json());

    if (field === "birthDate") {
      const currentYear = new Date().getFullYear();
      employees = employees.map(empl => ({ "age": currentYear - new Date(empl.birthDate).getFullYear() }))
      field = "age";
    }

    const statObj = Object.entries(this.countByField(employees, field, interval));
    return statObj.map(i => {
      const [index, count] = i;
      const from = (+index) * interval;
      const to = (+index + 1) * interval - 1;
      return { from, to, count }
    })
  }


  updateEmployee(id: number, newEmployee: Employee): Promise<Employee> {
    const res = fetch(this.url + `/${id}`, {
      method: 'PUT',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEmployee)
    }).then(response => response.json())
    return res
  }

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
