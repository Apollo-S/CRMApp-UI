import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {EmployeePost} from "app/models/EmployeePost";
import {HttpClient} from "@angular/common/http";
import {AppConst} from "app/app-const";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class EmployeePostService extends BaseService<EmployeePost> {

    private readonly employeesUrl: string;
    private postsUrl = '/posts/';

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.employeesUrl = appConst.baseUrl + appConst.employeesUrl + '/';
    }

    fetchAllBy(employeeId: number) {
        const url = this.employeesUrl + employeeId + this.postsUrl;
        return super.fetchAll(url);
    }



}
