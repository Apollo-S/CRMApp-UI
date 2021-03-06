import {DocumentType} from "./DocumentType";
import {DocumentStatus} from "./DocumentStatus";
import {ClientAgreement} from "./ClientAgreement";

export class Document {
    public id?: number;
    public docType?: DocumentType;
    public clientId?: number;
    public clientTitle?: string;
    public docTypeShortTitle?: string;
    public number?: number;
    public amount?: number;
    public dated?: string;
    public paymentDate?: string;
    public comment?: string;
    public status?: DocumentStatus;
    public passingDate?: string;
    public docStatus?: string;
    public agreementId?: number;
    public agreement?: ClientAgreement;
    public agreementNumber?: string;
    public agreementDateStart?: string;
    public agreementUrl?: string;
    public url?: string;
}
