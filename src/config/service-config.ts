import AuthService from "../service/auth/AuthService";
import AuthServiceFire from "../service/auth/AuthServiceFB";
import EmployeeService from "../service/crud/EmployeeService";
import EmployeeServiceFirebase from "../service/crud/EmployeeServiceFirebase";

export const authService: AuthService = new AuthServiceFire()
export const employeesService: EmployeeService = new EmployeeServiceFirebase()