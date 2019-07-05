import {BaseModel} from "./BaseModel";

export class Person extends BaseModel {
    public surname?: string;
    public firstname?: string;
    public lastname?: string;
    public shortName?: string;
    public fullName?: string;
    public inn?: string;
    public birthDate?: Date;
}
