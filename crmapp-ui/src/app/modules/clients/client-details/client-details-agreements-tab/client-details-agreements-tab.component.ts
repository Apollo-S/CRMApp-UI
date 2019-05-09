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
            if (client.id !== undefined) {
                try {
                    this.clientService.fetchAgreementsByClientId(this.client.id)
                        .subscribe(agreements => {
                            this.agreements = agreements;
                            this.loading = false;
                        })
                } catch (e) {
                    this.loading = false;
                }
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private initColumns(): void {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'number', header: 'Номер'},
            {field: 'dateStart', header: 'Актуален с'}
        ];
    }

}
