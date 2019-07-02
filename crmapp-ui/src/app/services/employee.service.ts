import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Employee} from '../models/Employee';
import {EmployeeAddress} from 'app/models/EmployeeAddress';
import {EmployeeAccount} from 'app/models/EmployeeAccount';
import {BaseService} from "./base.service";
import {AppConst} from "app/app-const";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Injectable()
export class EmployeeService extends BaseService<Employee> {

    private readonly employeesUrl: string;

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.employeesUrl = appConst.baseUrl + appConst.employeesUrl + '/';
    }

    fetchEmployees() {
        return super.fetchAll(this.employeesUrl);
    }

    fetchEmployeeById(id: number) {
        return super.fetchOne(this.employeesUrl + id);
    }

    addEmployee(employee: Employee) {
        return super.save(this.employeesUrl, employee);
    }

    updateEmployee(employee: Employee) {
        return super.update(this.employeesUrl + employee.id, employee);
    }

    deleteEmployee(id: number) {
        return super.delete(this.employeesUrl + id);
    }

    // TODO Remove to the separate service
    getAddressesByEmployeeId(id: number) {
        const url = `${this.employeesUrl}/${id}/addresses`;
        return this.http
            .get<EmployeeAddress[]>(url, {headers: this.headers})
            .pipe(
                catchError(this.handleError<EmployeeAddress[]>('getAddressesByEmployeeId'))
            )
    }

    getAccountsByEmployeeId(employeeId: number) {
        const url = `${this.employeesUrl}/${employeeId}/accounts`;
        return this.http
            .get<EmployeeAccount[]>(url, {headers: this.headers})
            .pipe(
                catchError(this.handleError<EmployeeAccount[]>('getAccountsByEmployeeId'))
            )
    }

}
