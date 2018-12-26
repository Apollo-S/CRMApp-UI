import {Injectable} from '@angular/core';
import {ClientAddress} from "../models/ClientAddress";
import {HttpClient} from "@angular/common/http";
import {AppConst} from "../app-const";
import {ClientService} from "./client.service";

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    private clientId: number;
    private addressesUrl: string;
    private countriesUrl: string;

    constructor(private http: HttpClient,
                private appConst: AppConst, private clientService: ClientService) {
        this.clientId = this.clientService.getCurrentClient().id;
        this.addressesUrl = this.appConst.clientsUrl + this.clientId + '/addresses';
        this.countriesUrl = this.appConst.baseUrl + this.appConst.countriesUrl;
    }

    fetchAddressesByClientId(clientId: number) {
        return this.http.get<ClientAddress[]>(this.addressesUrl);
    }

    // getAddresses() {
    //     return this.client.addresses;
    // }

    getAddressById(addressId: number, clientId: number) {
        const url = this.addressesUrl + addressId;
        return this.http.get<ClientAddress>(url);
    }

    fetchCountries() {
        return this.http.get<any>(this.countriesUrl);
    }

}
