import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from 'app/services/client.service';
import {Subscription} from "rxjs";
import {Client} from "app/models/Client";
import {ClientAddress} from "app/models/ClientAddress";

@Component({
    selector: 'app-client-details-addresses-tab',
    templateUrl: './client-details-addresses-tab.component.html',
    styleUrls: ['./client-details-addresses-tab.component.css']
})
export class ClientDetailsAddressesTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    client: Client = {};
    columns: any[] = [];
    addresses: ClientAddress[] = [];
    loading: boolean;

    constructor(public clientService: ClientService) {
        this.initColumns();
    }

    ngOnInit() {
        this.loading = true;
        this.subscription = this.clientService.getCurrentClient().subscribe(client => {
            this.client = client;
            this.getAddresses().then(() => this.loading = false);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getAddresses() {
        return this.clientService.fetchAddressesByClientId(this.client.id).toPromise()
            .then(addresses => this.addresses = addresses);
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'presentation', header: 'Адрес'},
            {field: 'dateStart', header: 'Действует с'}
        ];
    }

}
