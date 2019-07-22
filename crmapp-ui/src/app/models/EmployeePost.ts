import {Post} from "./Post";
import {BaseModel} from "./BaseModel";

export class EmployeePost extends BaseModel {
    public post?: Post;
    public dateStart: Date;
    public active: boolean;
}