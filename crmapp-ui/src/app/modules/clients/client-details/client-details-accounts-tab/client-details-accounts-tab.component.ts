import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientAccount} from 'app/models/ClientAccount';
import {Client} from 'app/models/Client';
import {Subscription} from "rxjs";
import {ClientAccountService} from "app/services/client-account.service";
import {SubscriptionService} from "app/services/subscription.service";

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

    constructor(private subscriptionService: SubscriptionService,
                private accountService: ClientAccountService) {
        this.initColumns();
    }

    ngOnInit() {
        this.loading = true;
        this.subscription = this.subscriptionService.getCurrentClient().subscribe(client => {
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
