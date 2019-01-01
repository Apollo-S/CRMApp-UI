import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/client.service';

@Component({
  selector: 'app-client-details-addresses-tab',
  templateUrl: './client-details-addresses-tab.component.html',
  styleUrls: ['./client-details-addresses-tab.component.css']
})
export class ClientDetailsAddressesTabComponent implements OnInit {
    columns: any[] = [];
    addresses: any[] = [];
    loading: boolean;

    constructor(public clientService: ClientService) {
    }

    ngOnInit() {
        this.loading = true;
        this.initColumns();
        this.getAddresses().then(() => this.loading = false);
    }

    async getAddresses() {
        this.addresses = await this.clientService.fetchAddressesByClientId(this.getClient().id).toPromise();
    }

    getClient() {
        return this.clientService.getCurrentClient();
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'presentation', header: 'Адрес'},
            {field: 'dateStart', header: 'Действует с'}
        ];
    }

}
