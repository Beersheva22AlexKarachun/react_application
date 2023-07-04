import { Observable } from "rxjs";
import Employee from "../model/Employee";

export default interface EmployeeService {
  addEmployee(empl: Employee): Promise<Employee>;
  getEmployees(): Observable<Employee[] | string>;
  delete(id: number): Promise<void>;
  getEmployeeById(id: number): Promise<Employee>;
}