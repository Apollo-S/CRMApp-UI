import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeAddress} from 'app/models/EmployeeAddress';
import {Subscription} from 'rxjs';
import {EmployeeService} from 'app/services/employee.service';
import {Employee} from 'app/models/Employee';
import {EmployeeAddressService} from "../../../../services/employee-address.service";
import {SubscriptionService} from "../../../../services/subscription.service";

@Component({
    selector: 'app-employee-details-addresses-tab',
    templateUrl: './employee-details-addresses-tab.component.html',
    styleUrls: ['./employee-details-addresses-tab.component.css'],
    providers: [EmployeeService, EmployeeAddressService]
})
export class EmployeeDetailsAddressesTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    columns = [];
    addresses: EmployeeAddress[] = [];
    employee: Employee = new Employee();
    responsive: any;
    loading: boolean;

    options = {
        sortField: 'id',
        sortOrder: 1,
        buttonTitle: {add: 'Новый адрес', edit: 'Изменить'},
        responsive: false,
        reorderableColumns: false,
        rowHover: true,
        paginator: false,
        rows: 0,
        autoLayout: false,
        routerLinkUrl: ['add'],
    };

    constructor(private subscriptionService: SubscriptionService,
                private employeeService: EmployeeService,
                private addressService: EmployeeAddressService) {
        this.initColumns();
    }

    ngOnInit() {
        this.loading = true;
        this.subscription = this.subscriptionService.getCurrentEmployee()
            .subscribe(employee => {
                this.employee = employee;
                if (employee.id !== undefined) {
                    try {
                        this.addressService.fetchAllBy(employee.id)
                            .subscribe(addresses => {
                                this.addresses = addresses;
                                this.loading = false;
                            })
                    } catch (e) {
                        console.log(e);
                        this.loading = false;
                    }
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    refreshDatasource() {
        this.ngOnInit();
    }

    initColumns() {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'address.presentation', header: 'Адрес'},
            {field: 'dateStart', header: 'Действует с'}
        ];
    }

}
