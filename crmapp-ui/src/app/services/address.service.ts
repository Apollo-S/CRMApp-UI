import {Injectable} from '@angular/core';
import {Address} from "app/models/Address";
import {HttpClient} from "@angular/common/http";
import {AppConst} from "../app-const";
import {ClientService} from "./client.service";

@Injectable()
export class AddressService {
    private clientId: number;
    private addressesUrl: string;
    private countriesUrl: string;

    constructor(private http: HttpClient,
                private appConst: AppConst,
                private clientService: ClientService) {
        this.clientService.getCurrentClient().subscribe(data => {
            this.clientId = data.id;
            this.addressesUrl = appConst.clientsUrl + data.id + '/addresses';
        });
        this.countriesUrl = appConst.baseUrl + appConst.countriesUrl;
    }

    fetchAddressesByClientId(clientId: number) {
        return this.http.get<Array<Address>>(this.addressesUrl);
    }

    getAddressById(addressId: number, clientId: number) {
        const url = this.addressesUrl + addressId;
        return this.http.get<Address>(url);
    }

}
