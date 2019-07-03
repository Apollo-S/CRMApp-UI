import {Address} from "./Address";
import {Employee} from "./Employee";

export class EmployeeAddress extends Address {
    public employeeId: number;
    public employee?: Employee;
}
