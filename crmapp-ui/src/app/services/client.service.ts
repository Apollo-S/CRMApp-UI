import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, of} from 'rxjs';
import {Client} from '../models/Client';
import {ClientAddress} from '../models/ClientAddress';
import {ClientAccount} from '../models/ClientAccount';
import {ClientAgreement} from '../models/ClientAgreement';
import {ClientDirector} from '../models/ClientDirector';
import {AppConst} from '../app-const';
import {BaseServiceService} from "./base-service.service";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";
import {MessageService} from "primeng/api";

@Injectable()
export class ClientService extends BaseServiceService {

    private readonly headers: any;
    private readonly clientsUrl: string;
    private clients: Client[];
    private client: Client = {};

    private _property$: BehaviorSubject<Client> = new BehaviorSubject({});

    set property(value: Client) {
        this._property$.next(value);
    }

    get property$(): Observable<Client> {
        return this._property$.asObservable();
    }

    constructor(private http: HttpClient,
                private appConst: AppConst,
                router: Router,
                private messageService: MessageService) {
        super(router);
        this.clientsUrl = appConst.baseUrl + appConst.clientsUrl + '/';
        this.headers = appConst.headersJSON;
        this.client.accounts = [];
        this.client.addresses = [];
        this.client.agreements = [];
        this.client.directors = [];
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

    getCurrentClient() {
        return this.client;
        // this.fetchClient()
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
        return this.http.get<ClientAddress[]>(url);
    }

    getAddresses() {
        return this.client.addresses;
    }

    getAddressById(addressId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses/' + addressId;
        return this.http.get<any>(url, {headers: this.headers});
    }

    addAddress(address: ClientAddress, clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses';
        return this.http.post<ClientAddress>(url, address, {headers: this.headers});
    }

    updateAddress(address: ClientAddress, clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses/' + address.id;
        return this.http.put<ClientAddress>(url, address, {headers: this.headers});
    }

    deleteAddress(addressId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses/' + addressId;
        return this.http.delete(url, {headers: this.headers});
    }

    // Accounts
    private fetchAccountsByClientId(clientId: number) {
        const accountsUrl = this.clientsUrl + clientId + '/accounts';
        return this.http.get<Array<ClientAccount>>(accountsUrl);
    }

    getAccountsByClientId(clientId: number) {
        const url = `${this.clientsUrl}/${clientId}/accounts`;
        return this.http.get<Array<ClientAccount>>(url, {headers: this.headers})
    }

    getAccountById(id: number, client: Client) {
        const url = `${this.clientsUrl}/${client.id}/accounts/${id}`;
        return this.http.get<ClientAccount>(url, {headers: this.headers})
    }

    addAccount(account: ClientAccount, clientId: number) {
        const url = this.clientsUrl + clientId + '/accounts';
        return this.http.post<ClientAccount>(url, account, {headers: this.headers});
    }

    updateAccount(account: ClientAccount, clientId: number) {
        const url = this.clientsUrl + clientId + '/accounts/' + account.id;
        return this.http.put<ClientAccount>(url, account, {headers: this.headers})
    }

    deleteAccount(accountId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/accounts/' + accountId;
        return this.http.delete(url, {headers: this.headers});
    }

    // Directors
    private fetchDirectorsByClientId(clientId) {
        const directorsUrl = this.clientsUrl + clientId + '/directors';
        return this.http.get<Array<ClientDirector>>(directorsUrl);
    }

    getDirectors() {
        return this.client.directors;
    }

    getDirectorsByClientId(clientId: number) {
        const url = this.clientsUrl + clientId + '/directors/';
        return this.http.get<ClientDirector[]>(url, {headers: this.headers});
    }

    getDirectorById(directorId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/directors/' + directorId;
        return this.http.get<ClientDirector>(url, {headers: this.headers})
    }

    addDirector(director: ClientDirector, clientId: number) {
        const url = this.clientsUrl + clientId + '/directors';
        return this.http.post<ClientDirector>(url, director, {headers: this.headers});
    }

    updateDirector(director: ClientDirector, clientId: number) {
        const url = this.clientsUrl + clientId + '/directors/' + director.id;
        return this.http.put<ClientDirector>(url, director, {headers: this.headers});
    }

    deleteDirector(directorId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/directors/' + directorId;
        return this.http.delete(url, {headers: this.headers});
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

    getAgreementsByClientId(clientId: number) {
        const url = this.clientsUrl + clientId + '/agreements';
        return this.http.get<ClientAgreement[]>(url, {headers: this.headers})
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            this.messageService.add({
                sticky: true,
                severity: 'error',
                summary: operation,
                detail: 'failed: ' + error.message
            })
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        }
    }

}
