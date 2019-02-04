import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientService} from 'app/services/client.service';
import {Client} from 'app/models/Client';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    clientId: number;
    client: Client = {};
    loadingState: boolean;

    constructor(private clientService: ClientService,
                private route: ActivatedRoute) {
        this.clientId = +route.snapshot.params.id;

    }

    ngOnInit() {
        this.loadingState = true;
        this.getClient().then(() => {
            this.loadingState = false;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getClient() {
        return this.clientService.fetchClientById(this.clientId).toPromise()
            .then(data => {
                this.clientService.setCurrentClient(data);
                this.subscription = this.clientService.getCurrentClient()
                    .subscribe(client => this.client = client);
                }
            );
    }


}
