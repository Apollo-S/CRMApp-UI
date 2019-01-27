import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../services/client.service';
import {ClientAgreement} from "../../../../models/ClientAgreement";

@Component({
    selector: 'app-client-details-agreements-tab',
    templateUrl: './client-details-agreements-tab.component.html',
    styleUrls: ['./client-details-agreements-tab.component.css']
})
export class ClientDetailsAgreementsTabComponent implements OnInit {
    columns: any[];
    agreements: ClientAgreement[] = [];
    loading: boolean;

    constructor(private clientService: ClientService) {
    }

    ngOnInit() {
        this.loading = true;
        this.initColumns();
        this.getAgreements().then(() => this.loading = false);
    }

    async getAgreements() {
        this.agreements = await this.clientService.fetchAgreementsByClientId(this.getClient().id).toPromise();
    }

    getClient() {
        return this.clientService.getCurrentClient();
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'number', header: 'Номер'},
            {field: 'dateStart', header: 'Актуален с'}
        ];
    }

}
