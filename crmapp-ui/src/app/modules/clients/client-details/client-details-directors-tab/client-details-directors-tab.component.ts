import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from 'app/services/client.service';
import {ClientDirector} from "app/models/ClientDirector";
import {Subscription} from "rxjs";
import {Client} from "app/models/Client";

@Component({
    selector: 'app-client-details-directors-tab',
    templateUrl: './client-details-directors-tab.component.html',
    styleUrls: ['./client-details-directors-tab.component.css']
})
export class ClientDetailsDirectorsTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    client: Client = {};
    columns: any[];
    directors: ClientDirector[] = [];
    loading: boolean;

    constructor(private clientService: ClientService) {
        this.initColumns();
    }

    ngOnInit() {
        this.loading = true;
        this.subscription = this.clientService.getCurrentClient().subscribe(client => {
            this.client = client;
            this.getDirectors().then(() => this.loading = false);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    async getDirectors() {
        this.directors = await this.clientService.fetchDirectorsByClientId(this.client.id).toPromise();
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
