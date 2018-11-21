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

    constructor(private clientService: ClientService) {
    }

    ngOnInit() {
        // this.getAccountsByClientId(this.client.id);
        this.initColumns();
    }

    getAccounts() {
        return this.clientService.getCurrentClient().accounts;
    }

    private getAccountsByClientId(id: number) {
        this.clientService.getAccountsByClientId(id)
            .subscribe(
                accounts => this.accounts = accounts
            );
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'presentation', header: 'Представление'},
            {field: 'dateStart', header: 'Действует с'}
        ];
    }

}
