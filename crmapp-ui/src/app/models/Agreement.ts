export interface Agreement {
    id?: number;
    agreementType?: Object;
    contractorInfo?: {
        title?
    };
    number?: string;
    dateStart?: Date;
    comment?: string;
    url?: string;
}
