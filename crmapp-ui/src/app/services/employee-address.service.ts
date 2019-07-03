import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {EmployeeAddress} from "app/models/EmployeeAddress";
import {HttpClient} from "@angular/common/http";
import {AppConst} from "app/app-const";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Injectable()
export class EmployeeAddressService extends BaseService<EmployeeAddress> {

    private readonly employeesUrl: string;
    private addressesUrl = '/addresses/';

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.employeesUrl = appConst.baseUrl + appConst.employeesUrl + '/';
    }

    fetchAllBy(employeeId: number) {
        const url = this.employeesUrl + employeeId + this.addressesUrl;
        return super.fetchAll(url);
    }

    fetchOneBy(employeeId: number, addressId: number) {
        const url = this.employeesUrl + employeeId + this.addressesUrl + addressId;
        return super.fetchOne(url);
    }

    addOneBy(employeeId: number, address: EmployeeAddress) {
        const url = this.employeesUrl + employeeId + this.addressesUrl;
        return super.save(url, address);
    }

    updateOneBy(employeeId: number, address: EmployeeAddress) {
        const url = this.employeesUrl + employeeId + this.addressesUrl + address.id;
        return super.update(url, address);
    }

    deleteBy(employeeId: number, addressId: number) {
        const url = this.employeesUrl + employeeId + this.addressesUrl + addressId;
        return super.delete(url);
    }

}
