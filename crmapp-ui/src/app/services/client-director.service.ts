import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AppConst} from "app/app-const";
import {ClientDirector} from "app/models/ClientDirector";

@Injectable()
export class ClientDirectorService extends BaseService<ClientDirector> {

    private readonly clientsUrl: string;

    constructor(http: HttpClient,
                router: Router,
                messageService: MessageService,
                private appConst: AppConst) {
        super(router, messageService, http);
        this.clientsUrl = appConst.baseUrl + appConst.clientsUrl + '/';
    }

    fetchAllByClientId(clientId: number) {
        const url = this.clientsUrl + clientId + '/directors';
        return super.fetchAll(url);
    }

    fetchDirectorBy(directorId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/directors/' + directorId;
        return super.fetchOne(url);
    }

    addDirector(director: ClientDirector, clientId: number) {
        const url = this.clientsUrl + clientId + '/directors';
        return super.save(url, director);
    }

    updateDirector(director: ClientDirector, clientId: number) {
        const url = this.clientsUrl + clientId + '/directors/' + director.id;
        return super.update(url, director);
    }

    deleteDirector(directorId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/directors/' + directorId;
        return super.delete(url);
    }

}
