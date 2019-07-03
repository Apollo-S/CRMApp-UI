import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/Client';
import {ClientAgreement} from 'app/models/ClientAgreement';
import {AppConst} from '../app-const';
import {BaseService} from "./base.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {MessageService} from "primeng/api";

@Injectable()
export class ClientService extends BaseService<Client> {

    private readonly clientsUrl: string;

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.clientsUrl = appConst.baseUrl + appConst.clientsUrl + '/';
    }

    fetchClients() {
        return super.fetchAll(this.clientsUrl);
    }

    fetchClientById(id: number) {
        return super.fetchOne(this.clientsUrl + id);
    }

    addClient(client: Client) {
        return super.save(this.clientsUrl, client);
    }

    updateClient(client: Client) {
        return super.update(this.clientsUrl + client.id, client);
    }

    deleteClient(id: number) {
        return super.delete(this.clientsUrl + id);
    }

    // Agreements
    fetchAgreementsByClientId(clientId: number) {
        const agreementsUrl = this.clientsUrl + clientId + '/agreements';
        return this.http.get<Array<ClientAgreement>>(agreementsUrl)
            .pipe(catchError(this.handleError<ClientAgreement[]>(
                'Ошибка при загрузке договоров клиента!'
            )));
    }

}
