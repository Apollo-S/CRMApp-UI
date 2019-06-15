import {Address} from "./Address";
import {Client} from "./Client";

export class ClientAddress extends Address {
    public clientId?: number;
    public client?: Client;
}
