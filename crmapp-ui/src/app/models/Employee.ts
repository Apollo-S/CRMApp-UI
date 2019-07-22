import {Person} from './Person';
import {Post} from './Post';
import {BaseModel} from "./BaseModel";

export class Employee extends BaseModel {
    public person?: Person;
    public entrepreneur?: boolean;
    public hireDate?: Date;
    public firedDate?: Date;
    public activePost?: Post;
}
