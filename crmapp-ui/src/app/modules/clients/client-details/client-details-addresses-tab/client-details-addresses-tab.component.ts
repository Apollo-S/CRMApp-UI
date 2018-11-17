import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/client.service';
import { ClientAddress } from '../../../../models/ClientAddress';
import { Client } from '../../../../models/Client';

@Component({
  selector: 'app-client-details-addresses-tab',
  templateUrl: './client-details-addresses-tab.component.html',
  styleUrls: ['./client-details-addresses-tab.component.css']
})
export class ClientDetailsAddressesTabComponent implements OnInit {
    columns: any[] = [];
    addresses: ClientAddress[] = [];
    client: Client = {};

    constructor(private clientService: ClientService) {
        this.getAddressesByClientId(this.clientService.getCurrentClient().id);
    }

    ngOnInit() {
        this.initColumns();
    }

    private getAddressesByClientId(id: number) {
        this.clientService.getAddressesByClientId(id);
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'presentation', header: 'Адрес'},
            {field: 'dateStart', header: 'Действует с'}
        ];
    }

}
