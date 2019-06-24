import {Injectable} from '@angular/core';
import {Client} from "../models/Client";
import {BehaviorSubject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {

    private currentClient: BehaviorSubject<Client> = new BehaviorSubject(new Client());

    constructor() {
    }

    getCurrentClient() {
        return this.currentClient.asObservable();
    }

    setCurrentClient(value: Client) {
        this.currentClient.next(value);
    }

}
