import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../services/client.service';

@Component({
    selector: 'app-client-details-agreements-tab',
    templateUrl: './client-details-agreements-tab.component.html',
    styleUrls: ['./client-details-agreements-tab.component.css']
})
export class ClientDetailsAgreementsTabComponent implements OnInit {
    columns: any[];

    constructor(private clientService: ClientService) {
    }

    ngOnInit() {
        this.initColumns();
    }

    getAgreements() {
        return this.clientService.getAgreements();
    }

    private getAgreementsByClientId(id: number) {
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'number', header: 'Номер'},
            {field: 'dateStart', header: 'Актуален с'}
        ];
    }

}
