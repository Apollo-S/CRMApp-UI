import {BaseModel} from "./BaseModel";
import {Client} from "./Client";

export class ClientAgreement extends BaseModel {
    clientInfo?: Client;
    clientCode?: string;
    clientUrl?: string;
    clientTitle?: string;
    number?: string;
    dateStart?: Date;
    comment?: string;
}
