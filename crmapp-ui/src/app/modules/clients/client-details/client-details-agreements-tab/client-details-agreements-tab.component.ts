import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientAgreement} from "app/models/ClientAgreement";
import {Subscription} from "rxjs";
import {Client} from "app/models/Client";
import {SubscriptionService} from "app/services/subscription.service";
import {ClientAgreementService} from "app/services/client-agreement.service";

@Component({
    selector: 'app-client-details-agreements-tab',
    templateUrl: './client-details-agreements-tab.component.html',
    styleUrls: ['./client-details-agreements-tab.component.css'],
    providers: [ClientAgreementService]
})
export class ClientDetailsAgreementsTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    client: Client = {};
    columns: any[];
    agreements: ClientAgreement[] = [];
    loading: boolean;

    constructor(private subscriptionService: SubscriptionService,
                private agreementService: ClientAgreementService) {
        this.initColumns();
    }

    ngOnInit() {
        this.loading = true;
        this.subscription = this.subscriptionService.getCurrentClient().subscribe(client => {
            this.client = client;
            if (client.id !== undefined) {
                try {
                    this.agreementService.fetchAllByClientId(this.client.id)
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
