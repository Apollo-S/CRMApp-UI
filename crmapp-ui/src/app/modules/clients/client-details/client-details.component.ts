import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientService} from 'app/services/client.service';
import {Client} from 'app/models/Client';
import {Subscription} from "rxjs";
import {SubscriptionService} from "app/services/subscription.service";

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.css'],
    providers: [ClientService]
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    clientId: number;
    client: Client = new Client();
    loadingState: boolean;

    constructor(private clientService: ClientService,
                private subscriptionService: SubscriptionService,
                private route: ActivatedRoute) {
        this.clientId = +route.snapshot.params.id;
    }

    ngOnInit() {
        this.loadingState = true;
        this.getClient().then(() => {
            this.loadingState = false;
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getClient() {
        return this.clientService.fetchClientById(this.clientId).toPromise()
            .then(data => {
                this.subscriptionService.setCurrentClient(data);
                this.subscription = this.subscriptionService.getCurrentClient()
                    .subscribe(client => this.client = client);
                }
            );
    }

}
