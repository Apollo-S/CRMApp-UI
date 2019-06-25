import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientDirector} from "app/models/ClientDirector";
import {Subscription} from "rxjs";
import {Client} from "app/models/Client";
import {ClientDirectorService} from "app/services/client-director.service";
import {SubscriptionService} from "app/services/subscription.service";

@Component({
    selector: 'app-client-details-directors-tab',
    templateUrl: './client-details-directors-tab.component.html',
    styleUrls: ['./client-details-directors-tab.component.css'],
    providers: [ClientDirectorService]
})
export class ClientDetailsDirectorsTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    client: Client = {};
    columns: any[];
    directors: ClientDirector[] = [];
    loading: boolean;

    constructor(private subscriptionService: SubscriptionService,
                private directorService: ClientDirectorService) {
        this.initColumns();
    }

    ngOnInit() {
        this.loading = true;
        this.subscription = this.subscriptionService.getCurrentClient().subscribe(client => {
            this.client = client;
            if (client.id !== undefined) {
                try {
                    this.directorService.fetchAllByClientId(client.id)
                        .subscribe(directors => {
                            this.directors = directors;
                        })
                } catch (e) {
                    console.log("Problem with fetching Directors", e);
                } finally {
                    this.loading = false;
                }
            }
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private initColumns() {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'fullName', header: 'ФИО'},
            {field: 'postTitle', header: 'Должность'},
            {field: 'dateStart', header: 'Актуален с'}
        ];
    }

}
