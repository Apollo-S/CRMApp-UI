import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {ClientAgreement} from "../models/ClientAgreement";
import {HttpClient} from "@angular/common/http";
import {AppConst} from "../app-const";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Injectable()
export class ClientAgreementService extends BaseService<ClientAgreement> {

    private readonly clientsUrl: string;

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.clientsUrl = appConst.baseUrl + appConst.clientsUrl + '/';
    }

    fetchAllByClientId(clientId: number) {
        const url = this.clientsUrl + clientId + '/agreements';
        return super.fetchAll(url);
    }

}
