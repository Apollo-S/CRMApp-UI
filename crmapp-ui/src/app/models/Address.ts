import {BaseModel} from "./BaseModel";

export abstract class Address extends BaseModel {
    country?: Object;
    region?: string;
    city?: string;
    street?: string;
    building?: string;
    apartment?: string;
    zip?: string;
    presentation?: string;
    dateStart?: Date;
}
