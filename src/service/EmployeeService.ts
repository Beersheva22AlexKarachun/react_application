import { Observable } from "rxjs";
import Employee from "../model/Employee";
import StatisticsType from "../model/StatisticsType";
import Response from "../model/Response";

export default interface EmployeeService {
  addEmployee(empl: Employee): Promise<Employee>;
  getEmployees(): Observable<Employee[] | string>;
  deleteEmployee(id: number): Promise<Response<Employee>>;
  getEmployeeById(id: number): Promise<Response<Employee>>;
  updateEmployee(id: number, newEmployee: Employee): Promise<Employee>;
  getStatistics(field: string, interval: number): Promise<StatisticsType[]>

}