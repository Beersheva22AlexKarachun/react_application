import { Observable } from "rxjs";
import Employee from "../model/Employee";
import StatisticsType from "../model/StatisticsType";
import Response from "../model/Response";

export default interface EmployeeService {
  addEmployee(empl: Employee): Promise<Response<Employee>>;
  getEmployees(): Observable<Response<Employee[]>>;
  deleteEmployee(id: number): Promise<void>;
  getEmployeeById(id: number): Promise<Response<Employee>>;
  updateEmployee(id: number, newEmployee: Employee): Promise<Response<Employee>>;
  // getStatistics(field: string, interval: number): Promise<StatisticsType[]>

}