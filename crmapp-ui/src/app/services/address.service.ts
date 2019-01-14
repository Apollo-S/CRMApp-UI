import {Injectable} from '@angular/core';
import {Address} from "app/models/Address";
import {HttpClient} from "@angular/common/http";
import {AppConst} from "../app-const";
import {ClientService} from "./client.service";

@Injectable({
    providedIn: 'root'
})
export class AddressService {
    private readonly clientId: number;
    private readonly addressesUrl: string;
    private readonly countriesUrl: string;

    constructor(private http: HttpClient,
                private appConst: AppConst, private clientService: ClientService) {
        this.clientId = this.clientService.getCurrentClient().id;
        this.addressesUrl = this.appConst.clientsUrl + this.clientId + '/addresses';
        this.countriesUrl = this.appConst.baseUrl + this.appConst.countriesUrl;
    }

    fetchAddressesByClientId(clientId: number) {
        return this.http.get<Array<Address>>(this.addressesUrl);
    }

    // getAddresses() {
    //     return this.client.addresses;
    // }

    getAddressById(addressId: number, clientId: number) {
        const url = this.addressesUrl + addressId;
        return this.http.get<Address>(url);
    }

    fetchCountries() {
        return this.http.get<Array<Address>>(this.countriesUrl);
    }

}
