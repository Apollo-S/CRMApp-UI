import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject, of, forkJoin} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Client} from '../models/Client';
import {ClientAddress} from '../models/ClientAddress';
import {ClientAccount} from '../models/ClientAccount';
import {ClientAgreement} from '../models/ClientAgreement';
import {ClientDirector} from '../models/ClientDirector';
import {AppConst} from '../app-const';

@Injectable()
export class ClientService {

    private readonly headers: any;
    private readonly clientsUrl: string;
    private clients: Client[];
    private client: Client = {};
    // private addresses: ClientAddress[];
    // private accounts: ClientAccount[];
    emitterClient = new EventEmitter<Client>();

    private _property$: BehaviorSubject<Client> = new BehaviorSubject({});

    set property(value: Client) {
        this._property$.next(value);
    }

    get property$(): Observable<Client> {
        return this._property$.asObservable();
    }

    constructor(private http: HttpClient,
                private appConst: AppConst) {
        this.clientsUrl = appConst.baseUrl + appConst.clientsUrl + '/';
        this.headers = appConst.headersJSON;
        this.client.accounts = [];
        this.client.addresses = [];
        this.client.agreements = [];
        this.client.directors = [];
    }

    fetchClients() {
        return this.http.get<Client[]>(this.clientsUrl, {headers: this.headers});
    }

    async fetchAllClientDataPromise(clientId: number) {
        let [ client, addresses, accounts, agreements, directors ] =
            await Promise.all([
                this.fetchClientById(clientId),
                this.fetchAddressesByClientId(clientId),
                this.fetchAccountsByClientId(clientId),
                this.fetchAgreementsByClientId(clientId),
                this.fetchDirectorsByClientId(clientId)
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
        return this.http.get(clientUrl).toPromise();
    }

    getCurrentClient() {
        return this.client;
    }

    addClient(client: Client) {
        return this.http.post<Client>(this.clientsUrl, client, {headers: this.headers})
    }

    updateClient(client: Client): Observable<Client> {
        const url = this.clientsUrl + client.id;
        return this.http.put<Client>(url, client, {headers: this.headers})
    }

    deleteClient(client: Client) {
        const url = this.clientsUrl + client.id;
        return this.http.delete(url, {headers: this.headers})
    }

    fetchAllClientDataForkJoin(clientId: number) {
        const clientUrl = this.clientsUrl + clientId;
        const addressesUrl = clientUrl + '/addresses';
        const accountsUrl = clientUrl + '/accounts';
        forkJoin(
            this.http.get(clientUrl),
            this.http.get<Array<ClientAddress>>(addressesUrl),
            this.http.get<Array<ClientAccount>>(accountsUrl)
        ).subscribe(
            data => {
                this.client = data[0];
                this.client.addresses = data[1];
                this.client.accounts = data[2];
                this.emitterClient.emit(this.client);
            });
    }

    // Addresses
    fetchAddressesByClientId(clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses';
        return this.http.get<ClientAddress[]>(url).toPromise();
    }

    getAddresses() {
        return this.client.addresses;
    }

    getAddressById(id: number, client: Client): Observable<ClientAddress> {
        const url = `${this.clientsUrl}/${client.id}/addresses/${id}`;
        return this.http
            .get<ClientAddress>(url, {headers: this.headers})
    }

    addAddress(address: ClientAddress, client: Client): Observable<ClientAddress> {
        const url = `${this.clientsUrl}/${client.id}/addresses`;
        return this.http
            .post<ClientAddress>(url, address, {headers: this.headers})
            .pipe(
                tap(_ => console.log(`added address for client ${client.alias}`)),
                catchError(this.handleError<ClientAddress>('addAddress'))
            );
    }

    updateAddress(address: ClientAddress, client: Client): Observable<ClientAddress> {
        const url = `${this.clientsUrl}/${client.id}/addresses/${address.id}`;
        return this.http
            .put<ClientAddress>(url, address, {headers: this.headers})
            .pipe(
                tap(_ => console.log(`updated address ID=${address.id} for client=${client.alias}`)),
                catchError(this.handleError<ClientAddress>('updateAddress'))
            );
    }

    deleteAddress(id: number, client: Client) {
        const url = `${this.clientsUrl}/${client.id}/addresses/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .pipe(
                tap(_ => console.log(`deleted address ID=${id} for client=${client.alias}`)),
                catchError(this.handleError<any>('deleteAddress'))
            );
    }

    // Accounts
    private fetchAccountsByClientId(clientId: number) {
        const accountsUrl = this.clientsUrl + clientId + '/accounts';
        return this.http.get<Array<ClientAccount>>(accountsUrl).toPromise();
    }

    getAccountsByClientId(clientId: number): Observable<ClientAccount[]> {
        const url = `${this.clientsUrl}/${clientId}/accounts`;
        return this.http
            .get<ClientAccount[]>(url, {headers: this.headers})
            .pipe(
                catchError(this.handleError<ClientAccount[]>('getAccountsByClientId'))
            );
    }

    getAccountById(id: number, client: Client): Observable<ClientAccount> {
        const url = `${this.clientsUrl}/${client.id}/accounts/${id}`;
        return this.http
            .get<ClientAccount>(url, {headers: this.headers})
            .pipe(
                tap(_ => console.log(`obtained account ID=${id} for client ${client.alias}`)),
                catchError(this.handleError<ClientAccount>('getAccountById'))
            );
    }

    addAccount(account: ClientAccount, client: Client): Observable<ClientAccount> {
        const url = `${this.clientsUrl}/${client.id}/accounts`;
        return this.http
            .post<ClientAccount>(url, account)
            .pipe(
                tap(_ => console.log(`added account for client ${client.alias}`)),
                catchError(this.handleError<ClientAccount>('addAccount'))
            );
    }

    updateAccount(account: ClientAccount, client: Client): Observable<ClientAccount> {
        const url = `${this.clientsUrl}/${client.id}/accounts/${account.id}`;
        return this.http
            .put<ClientAccount>(url, account, {headers: this.headers})
            .pipe(
                tap(_ => console.log(`updated account ID=${account.id} for client ${client.alias}`)),
                catchError(this.handleError<ClientAccount>('updateAccount'))
            );
    }

    deleteAccount(id: number, client: Client) {
        const url = `${this.clientsUrl}/${client.id}/accounts/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .pipe(
                tap(_ => console.log(`deleted account ID=${id} for client ${client.alias}`)),
                catchError(this.handleError<any>('deleteAccount'))
            );
    }

    // Directors
    private fetchDirectorsByClientId(clientId) {
        const directorsUrl = this.clientsUrl + clientId + '/directors';
        return this.http.get<Array<ClientDirector>>(directorsUrl).toPromise();
    }

    getDirectors() {
        return this.client.directors;
    }

    getDirectorsByClientId(clientId: number): Observable<ClientDirector[]> {
        const url = `${this.clientsUrl}/${clientId}/directors`;
        return this.http
            .get<ClientDirector[]>(url, {headers: this.headers})
            .pipe(
                catchError(this.handleError<ClientDirector[]>('getDirectorsByClientId'))
            );
    }

    getDirectorById(id: number, client: Client): Observable<ClientDirector> {
        const url = `${this.clientsUrl}/${client.id}/directors/${id}`;
        return this.http
            .get<ClientDirector>(url, {headers: this.headers})
            .pipe(
                tap(_ => console.log(`obtained director ID=${id} for client ${client.alias}`)),
                catchError(this.handleError<ClientDirector>('getDirectorById'))
            );
    }

    addDirector(director: ClientDirector, client: Client): Observable<ClientDirector> {
        const url = `${this.clientsUrl}/${client.id}/directors`;
        return this.http
            .post<ClientDirector>(url, director, {headers: this.headers})
            .pipe(
                tap(_ => console.log(`added director for client ${client.alias}`)),
                catchError(this.handleError<ClientDirector>('addDirector'))
            );
    }

    updateDirector(director: ClientDirector, client: Client): Observable<ClientDirector> {
        const url = `${this.clientsUrl}/${client.id}/directors/${director.id}`;
        return this.http
            .put<ClientDirector>(url, director, {headers: this.headers})
            .pipe(
                tap(_ => console.log(`updated director ID=${director.id} for client ${client.alias}`)),
                catchError(this.handleError<ClientDirector>('updateDirector'))
            );
    }

    deleteDirector(id: number, client: Client) {
        const url = `${this.clientsUrl}/${client.id}/directors/${id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .pipe(
                tap(_ => console.log(`deleted director ID=${id} for client ${client.alias}`)),
                catchError(this.handleError<any>('deleteDirector'))
            );
    }

    // Agreements
    fetchAgreementsByClientId(clientId: number) {
        const agreementsUrl = this.clientsUrl + clientId + '/agreements';
        return this.http.get<Array<ClientAgreement>>(agreementsUrl).toPromise();
    }

    getAgreements() {
        return this.client.agreements;
    }

    getAgreementsByClientId(clientId: number) {
        const url = `${this.clientsUrl}/${clientId}/agreements`;
        return this.http
            .get<ClientAgreement[]>(url, {headers: this.headers})
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        }
    }

}
