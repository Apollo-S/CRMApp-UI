import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/Client';
import {ClientAgreement} from 'app/models/ClientAgreement';
import {AppConst} from '../app-const';
import {BaseService} from "./base.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {MessageService} from "primeng/api";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class ClientService extends BaseService<Client> {

    protected readonly headers: any;
    private readonly clientsUrl: string;
    private client: Client = {};
    private loadingState: boolean;
    private currentClient: BehaviorSubject<Client> = new BehaviorSubject(new Client());

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.clientsUrl = appConst.baseUrl + appConst.clientsUrl + '/';
        this.headers = appConst.headersJSON;
        this.client.accounts = [];
        this.client.addresses = [];
        this.client.agreements = [];
        this.client.agreements = [];
        this.loadingState = true;
    }

    fetchClients() {
        return super.fetchAll(this.clientsUrl);
    }

    fetchClientById(id: number) {
        return super.fetchOne(this.clientsUrl + id);
    }

    getCurrentClient() {
        return this.currentClient.asObservable();
    }

    setCurrentClient(value: Client) {
        this.currentClient.next(value);
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
