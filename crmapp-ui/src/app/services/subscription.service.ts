import {Injectable} from '@angular/core';
import {Client} from "app/models/Client";
import {BehaviorSubject} from "rxjs";
import {Employee} from "app/models/Employee";

@Injectable({
    providedIn: 'root'
})
export class SubscriptionService {

    private currentClient: BehaviorSubject<Client> = new BehaviorSubject(new Client());
    private currentEmployee: BehaviorSubject<Employee> = new BehaviorSubject(new Employee());

    constructor() {
    }

    getCurrentClient() {
        return this.currentClient.asObservable();
    }

    setCurrentClient(value: Client) {
        this.currentClient.next(value);
    }

    getCurrentEmployee() {
        return this.currentEmployee.asObservable();
    }

    setCurrentEmployee(value: Employee) {
        this.currentEmployee.next(value);
    }

}
