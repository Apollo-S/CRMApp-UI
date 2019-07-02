import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {EmployeeAccount} from "app/models/EmployeeAccount";
import {HttpClient} from "@angular/common/http";
import {AppConst} from "app/app-const";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Injectable()
export class EmployeeAccountService extends BaseService<EmployeeAccount> {

    private readonly employeesUrl: string;
    private accounts = '/accounts/';

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.employeesUrl = appConst.baseUrl + appConst.employeesUrl + '/';
    }

    fetchAllBy(employeeId: number) {
        const url = this.employeesUrl + employeeId + this.accounts;
        return super.fetchAll(url);
    }

    fetchOneBy(employeeId: number, accountId: number) {
        const url = this.employeesUrl + employeeId + this.accounts + accountId;
        return super.fetchOne(url);
    }

    addOneBy(employeeId: number, account: EmployeeAccount) {
        const url = this.employeesUrl + employeeId + this.accounts;
        return super.save(url, account);
    }

    updateOneBy(employeeId: number, account: EmployeeAccount) {
        const url = this.employeesUrl + employeeId + this.accounts + account.id;
        return super.update(url, account);
    }

    deleteBy(employeeId: number, accountId: number) {
        const url = this.employeesUrl + employeeId + this.accounts + accountId;
        return super.delete(url);
    }

}
