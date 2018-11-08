import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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

    constructor(private clientService: ClientService) {}

    ngOnInit() {
        this.getAddressesByClientId(this.clientService.getCurrentClient().id);
        this.initColumns();
    }

    private getAddressesByClientId(id: number) {
        // this.clientService.getAddressesByClientId(id)
        //         //     .subscribe(
        //         //         addresses => this.addresses = addresses
        //         //     );
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
