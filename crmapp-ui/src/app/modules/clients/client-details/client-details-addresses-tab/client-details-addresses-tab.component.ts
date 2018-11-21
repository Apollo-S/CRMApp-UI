import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/client.service';

@Component({
  selector: 'app-client-details-addresses-tab',
  templateUrl: './client-details-addresses-tab.component.html',
  styleUrls: ['./client-details-addresses-tab.component.css']
})
export class ClientDetailsAddressesTabComponent implements OnInit {
    columns: any[] = [];

    constructor(public clientService: ClientService) {
    }

    ngOnInit() {
        this.initColumns();
    }

    getAddresses() {
        return this.clientService.getAddresses();
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'presentation', header: 'Адрес'},
            {field: 'dateStart', header: 'Действует с'}
        ];
    }

}
