import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {EmployeeService} from 'app/services/employee.service';
import {Employee} from 'app/models/Employee';
import {SubscriptionService} from "app/services/subscription.service";

@Component({
    selector: 'app-employee-details',
    templateUrl: './employee-details.component.html',
    styleUrls: ['./employee-details.component.css'],
    providers: [EmployeeService]
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
    employee: Employee = new Employee();
    private subscription: Subscription = new Subscription();
    employeeId: number;
    loadingState: boolean;

    constructor(private employeeService: EmployeeService,
                private subscriptionService: SubscriptionService,
                private route: ActivatedRoute) {
        this.employeeId = +route.snapshot.params.id;
    }

    ngOnInit() {
        this.loadingState = true;
        this.getEmployee().then(() => {
            this.loadingState = false;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    goBack() {
        this.employeeService.goToUrl(['/employees']);
    }

    getEmployee() {
        return this.employeeService.fetchEmployeeById(this.employeeId).toPromise()
            .then(data => {
                this.subscriptionService.setCurrentEmployee(data);
                this.subscription = this.subscriptionService.getCurrentEmployee()
                    .subscribe(
                        employee => this.employee = employee
                    );
            });
    }

}
