import {ClientAddress} from "./ClientAddress";
import {ClientAccount} from "./ClientAccount";
import {ClientAgreement} from "./ClientAgreement";
import {ClientDirector} from "./ClientDirector";
import {BaseModel} from "./BaseModel";

export class Client extends BaseModel {
        public title?: string;
        public code?: string;
        public edrpou?: string;
        public inn?: string;
        public vatCertificate?: string;
        public addresses?: ClientAddress[];
        public accounts?: ClientAccount[];
        public agreements?: ClientAgreement[];
        public directors?: ClientDirector[];
}
