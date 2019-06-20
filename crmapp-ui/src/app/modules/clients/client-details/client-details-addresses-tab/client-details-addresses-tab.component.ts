import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from 'app/services/client.service';
import {Subscription} from "rxjs";
import {Client} from "app/models/Client";
import {ClientAddress} from "app/models/ClientAddress";
import {ClientAddressService} from "../../../../services/client-address.service";

@Component({
    selector: 'app-client-details-addresses-tab',
    templateUrl: './client-details-addresses-tab.component.html',
    styleUrls: ['./client-details-addresses-tab.component.css'],
    providers: [ClientAddressService]
})
export class ClientDetailsAddressesTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    client: Client = {};
    columns: any[] = [];
    addresses: ClientAddress[] = [];
    loading: boolean;

    constructor(private clientService: ClientService,
                private addressService: ClientAddressService) {
        this.initColumns();
    }

    ngOnInit() {
        this.loading = true;
        this.subscription = this.clientService.getCurrentClient()
            .subscribe(client => {
                this.client = client;
                if (client.id !== undefined) {
                    try {
                        this.addressService.fetchAllByClientId(this.client.id)
                            .subscribe(addresses => {
                                this.addresses = addresses;
                                this.loading = false;
                            })
                    } catch (e) {
                        this.loading = false;
                    }
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'presentation', header: 'Адрес'},
            {field: 'dateStart', header: 'Действует с'}
        ];
    }

}
