import Employee from "../model/Employee";
import EmployeeService from "./EmployeeService";

export default class EmployeeServiceRest implements EmployeeService {
  constructor(private _url: string) { }
  
  addEmployee(empl: Employee): Promise<Employee> {
    throw new Error("Method not implemented.");
  }

}