import {Component, OnInit} from '@angular/core';
import {ClientAccount} from '../../../../models/ClientAccount';
import {ClientService} from '../../../../services/client.service';
import {Client} from '../../../../models/Client';

@Component({
    selector: 'app-client-details-accounts-tab',
    templateUrl: './client-details-accounts-tab.component.html',
    styleUrls: ['./client-details-accounts-tab.component.css']
})
export class ClientDetailsAccountsTabComponent implements OnInit {
    columns: any[];
    accounts: ClientAccount[] = [];
    client: Client = {};
    loading: boolean;

    constructor(private clientService: ClientService) {
    }

    ngOnInit() {
        this.loading = true;
        this.initColumns();
        this.getAccounts().then(() => this.loading = false);
    }

    async getAccounts() {
        this.accounts = await this.clientService.fetchAccountsByClientId(this.getClient().id).toPromise();
    }

    getClient() {
        return this.clientService.getCurrentClient();
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'presentation', header: 'Представление'},
            {field: 'dateStart', header: 'Действует с'}
        ];
    }

}
