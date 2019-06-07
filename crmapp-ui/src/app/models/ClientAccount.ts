import {Account} from "./Account";
import {Client} from "./Client";

export class ClientAccount extends Account {
    public clientId?: number;
    public client?: Client;
}
