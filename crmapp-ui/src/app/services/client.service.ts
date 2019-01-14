import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/Client';
import {ClientAddress} from '../models/ClientAddress';
import {ClientAccount} from '../models/ClientAccount';
import {ClientAgreement} from '../models/ClientAgreement';
import {ClientDirector} from '../models/ClientDirector';
import {AppConst} from '../app-const';
import {BaseService} from "./base.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {MessageService} from "primeng/api";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Employee} from "../models/Employee";

@Injectable()
export class ClientService extends BaseService {

    private _currentClient$: BehaviorSubject<Client> = new BehaviorSubject<Client>({});

    set currentClient(value: Client) {
        this._currentClient$.next(value);
    }

    get currentClient$(): Observable<Client> {
        return this._currentClient$.asObservable();
    }

    private readonly headers: any;
    private readonly clientsUrl: string;
    private clients: Client[];
    private client: Client = {};
    emitterClient: EventEmitter<Client> = new EventEmitter();
    emitterLoadState: EventEmitter<boolean> = new EventEmitter();
    private loadingState: boolean;
    // private _currentClient: Subject<Client> = new Subject<Client>();


    constructor(private http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService);
        this.clientsUrl = appConst.baseUrl + appConst.clientsUrl + '/';
        this.headers = appConst.headersJSON;
        this.client.accounts = [];
        this.client.addresses = [];
        this.client.agreements = [];
        this.client.directors = [];
        this.loadingState = true;
    }

    fetchClients() {
        return this.http.get<Client[]>(this.clientsUrl, {headers: this.headers})
            .pipe(catchError(this.handleError<Client[]>(
                'Ошибка при загрузке списка клиентов!'
            )));
    }

    async fetchAllClientDataPromise(clientId: number) {
        let [client, addresses, accounts, agreements, directors] =
            await Promise.all([
                this.fetchClientById(clientId).toPromise(),
                this.fetchAddressesByClientId(clientId).toPromise(),
                this.fetchAccountsByClientId(clientId).toPromise(),
                this.fetchAgreementsByClientId(clientId).toPromise(),
                this.fetchDirectorsByClientId(clientId).toPromise()
            ]);
        this.client = client;
        this.client.addresses = addresses;
        this.client.accounts = accounts;
        this.client.agreements = agreements;
        this.client.directors = directors;
        this.emitterLoadState.emit(false);
        this.loadingState = false;
    }

    getClients() {
        if (this.clients === undefined) {
            return this.clients = [];
        }
        return this.clients;
    }

    fetchClientById(clientId: number) {
        const clientUrl = this.clientsUrl + clientId;
        return this.http.get(clientUrl)
            .pipe(catchError(this.handleError<any>(
                'Ошибка при загрузке данных о клиенте!'
            )));
    }

    fetchClientData(clientId: number) {
        this.fetchClientById(clientId).subscribe(
            data => {
                this.emitterClient.emit(data);
                this.client = data;
            });
    }

    getCurrentClient() {
        return this.client;
    }

    getLoadingState() {
        return this.loadingState;
    }

    fetchClient(clientId: number) {
        if (this.client === undefined) {
            const clientUrl = this.clientsUrl + clientId;
            return this.http.get(clientUrl).toPromise().then(
                data => {
                    this.client = data;
                    return data;
                }
            );
        } else {
            return this.client;
        }
    }

    addClient(client: Client) {
        return this.http.post<Client>(this.clientsUrl, client, {headers: this.headers});
    }

    updateClient(client: Client) {
        return this.http.put<Client>( this.clientsUrl + client.id, client, {headers: this.headers});
    }

    deleteClient(clientId: number) {
        return this.http.delete(this.clientsUrl + clientId, {headers: this.headers});
    }

    // Addresses
    fetchAddressesByClientId(clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses';
        return this.http.get<ClientAddress[]>(url)
            .pipe(catchError(this.handleError<ClientAddress[]>(
                'Ошибка при получении списка адресов!'
            )));
    }

    getAddresses() {
        return this.client.addresses;
    }

    getAddressById(addressId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses/' + addressId;
        return this.http.get<any>(url, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAddress>(
                'Ошибка при получении адреса!'
            )));
    }

    addAddress(address: ClientAddress, clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses';
        return this.http.post<ClientAddress>(url, address, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAddress>(
                'Ошибка при добавлении нового адреса!'
            )));
    }

    updateAddress(address: ClientAddress, clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses/' + address.id;
        return this.http.put<ClientAddress>(url, address, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAddress>(
                'Ошибка при обновлении адреса!'
            )));
    }

    deleteAddress(addressId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses/' + addressId;
        return this.http.delete(url, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAddress>(
                'Ошибка при удалении адреса!'
            )));
    }

    // Accounts
    fetchAccountsByClientId(clientId: number) {
        const accountsUrl = this.clientsUrl + clientId + '/accounts';
        return this.http.get<Array<ClientAccount>>(accountsUrl)
            .pipe(catchError(this.handleError<Array<ClientAccount>>(
                'Ошибка при получении списка банк. счетов!'
            )));
    }

    getAccountById(accountId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/accounts/' + accountId;
        return this.http.get<ClientAccount>(url, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAccount>(
                'Ошибка при получении банк. счета!'
            )));
    }

    addAccount(account: ClientAccount, clientId: number) {
        const url = this.clientsUrl + clientId + '/accounts';
        return this.http.post<ClientAccount>(url, account, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAccount>(
                'Ошибка при добавлении нового банк. счета!'
            )));
    }

    updateAccount(account: ClientAccount, clientId: number) {
        const url = this.clientsUrl + clientId + '/accounts/' + account.id;
        return this.http.put<ClientAccount>(url, account, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAccount>(
                'Ошибка при обновлении банк. счета!'
            )));
    }

    deleteAccount(accountId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/accounts/' + accountId;
        return this.http.delete(url, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAccount>(
                'Ошибка при удалении банк. счета!'
            )));
    }

    // Directors
    fetchDirectorsByClientId(clientId) {
        const directorsUrl = this.clientsUrl + clientId + '/directors';
        return this.http.get<Array<ClientDirector>>(directorsUrl)
            .pipe(catchError(this.handleError<Array<ClientDirector>>(
                'Ошибка при получении списка директоров!'
            )));
    }

    getDirectors() {
        return this.client.directors;
    }

    getDirectorById(directorId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/directors/' + directorId;
        return this.http.get<ClientDirector>(url, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientDirector>(
                'Ошибка при добавлении директора!'
            )));
    }

    addDirector(director: ClientDirector, clientId: number) {
        const url = this.clientsUrl + clientId + '/directors';
        return this.http.post<ClientDirector>(url, director, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientDirector>(
                    'Ошибка при добавлении директора!'
            )));
    }

    updateDirector(director: ClientDirector, clientId: number) {
        const url = this.clientsUrl + clientId + '/directors/' + director.id;
        return this.http.put<ClientDirector>(url, director, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientDirector>(
                'Ошибка при изменении директора!'
            )));
    }

    deleteDirector(directorId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/directors/' + directorId;
        return this.http.delete(url, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientDirector>(
                'Ошибка при удалении директора!'
            )));
    }

    // Agreements
    fetchAgreementsByClientId(clientId: number) {
        const agreementsUrl = this.clientsUrl + clientId + '/agreements';
        return this.http.get<Array<ClientAgreement>>(agreementsUrl)
            .pipe(catchError(this.handleError<ClientAgreement[]>(
                'Ошибка при загрузке договоров клиента!'
            )));
    }

    getAgreements() {
        return this.client.agreements;
    }

}
