import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientAccount} from 'app/models/ClientAccount';
import {ClientService} from 'app/services/client.service';
import {Client} from 'app/models/Client';
import {Subscription} from "rxjs";
import {ClientAccountService} from "../../../../services/client-account.service";

@Component({
    selector: 'app-client-details-accounts-tab',
    templateUrl: './client-details-accounts-tab.component.html',
    styleUrls: ['./client-details-accounts-tab.component.css'],
    providers: [ClientAccountService]
})
export class ClientDetailsAccountsTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    columns: any[];
    accounts: ClientAccount[] = [];
    client: Client = {};
    loading: boolean;

    constructor(private clientService: ClientService,
                private accountService: ClientAccountService) {
        this.initColumns();
    }

    ngOnInit() {
        this.loading = true;
        this.subscription = this.clientService.getCurrentClient().subscribe(client => {
            this.client = client;
            if (client.id !== undefined) {
                this.getAccounts().then(() => this.loading = false);
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    async getAccounts() {
        this.accounts = await this.accountService.fetchAllByClientId(this.client.id).toPromise();
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'presentation', header: 'Представление'},
            {field: 'dateStart', header: 'Действует с'}
        ];
    }

}
