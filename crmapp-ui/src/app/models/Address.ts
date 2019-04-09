// export interface Address {
//     id: number;
//     country: Object;
//     region: string;
//     city: string;
//     street: string;
//     building: string;
//     apartment: string;
//     zip: string;
//     presentation: string;
//     dateStart: Date;
//     url: string
// }

import {BaseModel} from "./BaseModel";

export class Address extends BaseModel {
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
