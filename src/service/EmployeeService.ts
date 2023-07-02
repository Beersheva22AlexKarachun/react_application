import Employee from "../model/Employee";

export default interface EmployeeService {
  addEmployee(empl: Employee): Promise<Employee>;
}