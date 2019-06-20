import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {ClientAccount} from "app/models/ClientAccount";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AppConst} from "app/app-const";

@Injectable()
export class ClientAccountService extends BaseService<ClientAccount> {

    private readonly clientsUrl: string;

    constructor(http: HttpClient,
                router: Router,
                messageService: MessageService,
                private appConst: AppConst) {
        super(router, messageService, http);
        this.clientsUrl = appConst.baseUrl + appConst.clientsUrl + '/';
    }

    fetchAllByClientId(clientId: number) {
        const url = this.clientsUrl + clientId + '/accounts';
        return super.fetchAll(url);
    }

    fetchAccountBy(accountId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/accounts/' + accountId;
        return super.fetchOne(url);
    }

    addAccount(account: ClientAccount, clientId: number) {
        const url = this.clientsUrl + clientId + '/accounts';
        return super.save(url, account);
    }

    updateAccount(account: ClientAccount, clientId: number) {
        const url = this.clientsUrl + clientId + '/accounts/' + account.id;
        return super.update(url, account);
    }

    deleteAccount(accountId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/accounts/' + accountId;
        return super.delete(url);
    }

}
