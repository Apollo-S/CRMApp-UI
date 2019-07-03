import {Component, OnInit} from '@angular/core';
import {EmployeeService} from 'app/services/employee.service';
import {Employee} from 'app/models/Employee';
import {MenuItem} from 'primeng/api';
import {SubscriptionService} from "app/services/subscription.service";

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
    providers: [EmployeeService]
})
export class EmployeesComponent implements OnInit {
    employees: Employee[] = [];
    items: MenuItem[] = [];
    sortField: string;
    buttonTitle = {add: 'Новый', edit: 'Редакт.', additional: 'Прочее'};
    columns = [];
    loading: boolean;
    title: string = 'Сотрудники';
    autoLayout = true;
    rowHover = true;
    paginator = false;
    reorderableColumns = true;
    responsive = true;
    rows = +0;
    selectedItem: any;

    constructor(private employeeService: EmployeeService,
                private subscriptionService: SubscriptionService) {
        this.initColumns();
        this.initMenu();
        this.sortField = this.columns[0].field;
    }

    ngOnInit() {
        this.loading = true;
        this.refreshDatasource().then(() => {
            this.loading = false;
            this.subscriptionService.getCurrentEmployee().subscribe(
                (item) => this.selectedItem = item
            );
        });
    }

    refreshDatasource() {
        return this.employeeService.fetchEmployees().toPromise().then(
            employees => this.employees = employees
        );
    }

    private initColumns() {
        this.columns = [
            {field: 'personShortName', header: 'ФИО'},
            {field: 'personInn', header: 'ИНН'},
            {field: 'postTitle', header: 'Должность'}
        ];
    }

    private initMenu() {
        this.items = [
            {label: 'Отпуски', icon: 'fa fa-user-o', title: 'vacations'},
            {label: 'Больн. листы', icon: 'fa fa-user-o', title: 'sicks'},
            {label: 'Адресы', icon: 'fa fa-building-o', title: 'addresses'},
            {label: 'Банк. реквизиты', icon: 'fa fa-bank', title: 'accounts'}
        ];
    }

}
