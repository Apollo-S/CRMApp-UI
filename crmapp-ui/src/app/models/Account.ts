import {BaseModel} from "./BaseModel";

export abstract class Account extends BaseModel {
    number?: string;
    bankName?: string;
    mfo?: string;
    presentation?: string;
    dateStart?: Date;
}
