import {Address} from "./Address";
import {Employee} from "./Employee";
import {BaseModel} from "./BaseModel";

export class EmployeeAddress extends BaseModel {
    public employee?: Employee;
    public address?: Address;
    public dateStart?: Date;
}
