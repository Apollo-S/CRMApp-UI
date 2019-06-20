import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {AppConst} from "app/app-const";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {ClientAddress} from "app/models/ClientAddress";

@Injectable()
export class ClientAddressService extends BaseService<ClientAddress> {

    private readonly clientsUrl: string;

    constructor(http: HttpClient,
                router: Router,
                messageService: MessageService,
                private appConst: AppConst) {
        super(router, messageService, http);
        this.clientsUrl = appConst.baseUrl + appConst.clientsUrl + '/';
    }

    fetchAllByClientId(clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses';
        return super.fetchAll(url);
    }

    fetchAddressBy(addressId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses/' + addressId;
        return super.fetchOne(url);
    }

    addAddress(address: ClientAddress, clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses';
        return super.save(url, address);
    }

    updateAddress(address: ClientAddress, clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses/' + address.id;
        return super.update(url, address);
    }

    deleteAddress(addressId: number, clientId: number) {
        const url = this.clientsUrl + clientId + '/addresses/' + addressId;
        return super.delete(url);
    }

}
