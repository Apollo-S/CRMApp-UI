import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from 'app/models/Employee';
import {Subscription} from 'rxjs';
import {EmployeeService} from 'app/services/employee.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SubscriptionService} from "app/services/subscription.service";

@Component({
    selector: 'app-employee-details-main-tab',
    templateUrl: './employee-details-main-tab.component.html',
    styleUrls: ['./employee-details-main-tab.component.css'],
    providers: [EmployeeService]
})
export class EmployeeDetailsMainTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    employee: Employee = new Employee();
    loadingState: boolean;

    constructor(private employeeService: EmployeeService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private subscriptionService: SubscriptionService) {
    }

    ngOnInit() {
        this.loadingState = true;
        try {
            this.subscription = this.subscriptionService.getCurrentEmployee()
                .subscribe(employee => {
                    this.employee = employee;
                    this.loadingState = false;
                });
        } catch (e) {
            console.log(e);
            this.loadingState = false;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    confirmDeleting() {
        let msg = 'Сотрудник \"' + this.employee.person.shortName + '(ID=' + this.employee.id + ')\" успешно удален';
        this.confirmationService.confirm({
            message: 'Действительно удалить сотрудника?',
            header: 'Удаление объекта',
            icon: 'fa fa-trash',
            accept: () => {
                this.employeeService.deleteEmployee(this.employee.id).toPromise()
                    .then(() => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: (msg + ' успешно удален')
                        });
                        this.employeeService.goToUrl(['/employees']);
                    })
            },
            reject: () => {
            }
        });
    }

}
