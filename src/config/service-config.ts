import AuthService from "../service/AuthService";
import AuthServiceJwt from "../service/AuthServiceJwt";
import EmployeeService from "../service/EmployeeService";
import EmployeeServiceRest from "../service/EmployeeServiceRest";

export const authService: AuthService = new AuthServiceJwt('http://localhost:3500/login')
export const employeesService: EmployeeService = new EmployeeServiceRest("http://localhost:3500/employees")