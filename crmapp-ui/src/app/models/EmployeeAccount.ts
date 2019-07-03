import {Account} from "./Account";
import {Employee} from "./Employee";

export class EmployeeAccount extends Account {
    public employeeId?: number;
    public employee?: Employee;
}
