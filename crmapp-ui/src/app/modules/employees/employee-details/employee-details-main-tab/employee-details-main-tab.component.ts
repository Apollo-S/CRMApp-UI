import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from 'app/models/Employee';
import {Subscription} from 'rxjs';
import {EmployeeService} from 'app/services/employee.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SubscriptionService} from "app/services/subscription.service";
import {EmployeePostService} from "app/services/employee-post.service";
import {Post} from "app/models/Post";

@Component({
    selector: 'app-employee-details-main-tab',
    templateUrl: './employee-details-main-tab.component.html',
    styleUrls: ['./employee-details-main-tab.component.css'],
    providers: [EmployeeService, EmployeePostService]
})
export class EmployeeDetailsMainTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    employee: Employee = new Employee();
    loadingState: boolean;
    activePost: Post = new Post();

    constructor(private employeeService: EmployeeService,
                private employeePostService: EmployeePostService,
                private messageService: MessageService,
                private confirmationService: ConfirmationService,
                private subscriptionService: SubscriptionService) {
        this.loadingState = true;
    }

    ngOnInit() {
        try {
            this.subscription = this.subscriptionService.getCurrentEmployee()
                .subscribe(employee => {
                    this.employee = employee;
                    if (employee.id !== undefined) {
                        this.employeePostService.fetchAllBy(employee.id).subscribe(
                            posts => {
                                debugger
                                if (posts) {
                                    posts.forEach(item => {
                                        if (item.active) this.activePost = item.post;
                                    });
                                }
                                this.loadingState = false;
                            }
                        )
                    }
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
