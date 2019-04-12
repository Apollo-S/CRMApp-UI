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
        debugger;
        this.subscription = this.clientService.getCurrentClient()
            .subscribe(client => {
                this.client = client;
                try {
                    this.clientService.fetchAddressesByClientId(this.client.id)
                        .subscribe(addresses => {
                            this.addresses = addresses;
                            this.loading = false;
                        })
                } catch (e) {
                    this.loading = false;
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getAddresses() {
        try {
            this.clientService.fetchAddressesByClientId(this.client.id).toPromise()
                .then(addresses => this.addresses = addresses)
        } catch {
            console.log("Catch block")
            this.loading = false;
        } finally {
            console.log("Finally block")
            this.loading = false;
        }
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'presentation', header: 'Адрес'},
            {field: 'dateStart', header: 'Действует с'}
        ];
    }

}
