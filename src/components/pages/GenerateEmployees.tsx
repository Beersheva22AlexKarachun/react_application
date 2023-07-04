import InputResult from "../../model/InputResult";
import { useDispatch } from "react-redux";
import GenerateEmployeesForm from "../forms/GenerateEmployeesForm";
import { getRandomEmployee } from "../../util/random";
import { employeesService } from "../../config/service-config";
import employeeConfig from "../../config/employee-config.json"
import Employee from "../../model/Employee";



const GenerateEmployees: React.FC = () => {
  const dispatch = useDispatch();
  const { minYear, minSalary, maxYear, maxSalary, departments } = employeeConfig;

  async function submitFn(nEmployees: number): Promise<InputResult> {
    const res: InputResult = { status: 'success', message: '' };
    try {
      for (let index = 0; index < nEmployees; index++) {
        await employeesService.addEmployee(getRandomEmployee(minSalary, maxSalary, minYear, maxYear, departments))
      }
      res.message = `${nEmployees} employees have been added`
    } catch (error: any) {
      res.status = 'error';
      res.message = error;
    }
    return res
  }
  return <GenerateEmployeesForm submitFn={submitFn} />
}
export default GenerateEmployees;