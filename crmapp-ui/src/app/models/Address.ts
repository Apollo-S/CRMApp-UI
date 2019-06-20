import {BaseModel} from "./BaseModel";
import {Country} from "./Country";

export abstract class Address extends BaseModel {
    country?: Country;
    region?: string;
    city?: string;
    street?: string;
    building?: string;
    apartment?: string;
    zip?: string;
    presentation?: string;
    dateStart?: Date;
}
