import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientAccount} from '../../../../models/ClientAccount';
import {ClientService} from '../../../../services/client.service';
import {Client} from '../../../../models/Client';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-client-details-accounts-tab',
    templateUrl: './client-details-accounts-tab.component.html',
    styleUrls: ['./client-details-accounts-tab.component.css']
})
export class ClientDetailsAccountsTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    columns: any[];
    accounts: ClientAccount[] = [];
    client: Client = {};
    loading: boolean;

    constructor(private clientService: ClientService) {
        this.initColumns();
    }

    ngOnInit() {
        this.loading = true;
        this.subscription = this.clientService.getCurrentClient().subscribe(client => {
            this.client = client;
            this.getAccounts().then(() => this.loading = false);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    async getAccounts() {
        this.accounts = await this.clientService.fetchAccountsByClientId(this.client.id).toPromise();
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'presentation', header: 'Представление'},
            {field: 'dateStart', header: 'Действует с'}
        ];
    }

}
