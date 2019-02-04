import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from 'app/services/client.service';
import {ClientAgreement} from "app/models/ClientAgreement";
import {Subscription} from "rxjs";
import {Client} from "app/models/Client";

@Component({
    selector: 'app-client-details-agreements-tab',
    templateUrl: './client-details-agreements-tab.component.html',
    styleUrls: ['./client-details-agreements-tab.component.css']
})
export class ClientDetailsAgreementsTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    client: Client = {};
    columns: any[];
    agreements: ClientAgreement[] = [];
    loading: boolean;

    constructor(private clientService: ClientService) {
        this.initColumns();
    }

    ngOnInit() {
        this.loading = true;
        this.subscription = this.clientService.getCurrentClient().subscribe(client => {
            this.client = client;
            this.getAgreements().then(() => this.loading = false);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    async getAgreements() {
        this.agreements = await this.clientService.fetchAgreementsByClientId(this.client.id).toPromise();
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'number', header: 'Номер'},
            {field: 'dateStart', header: 'Актуален с'}
        ];
    }

}
