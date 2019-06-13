import {BaseModel} from "./BaseModel";
import {Bank} from "./Bank";
import {CurrencyType} from "./CurrencyType";

export abstract class Account extends BaseModel {
    number?: string;
    bank?: Bank;
    currencyType?: CurrencyType;
    presentation?: string;
    dateStart?: Date;
}
