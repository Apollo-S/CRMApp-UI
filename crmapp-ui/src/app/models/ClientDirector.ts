import { Post } from './Post';
import {Director} from "./Director";
import {Client} from "./Client";

export class ClientDirector extends Director {
    public clientId?: number;
    public client?: Client;
}
