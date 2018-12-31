import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../services/client.service';
import {ClientDirector} from "../../../../models/ClientDirector";

@Component({
    selector: 'app-client-details-directors-tab',
    templateUrl: './client-details-directors-tab.component.html',
    styleUrls: ['./client-details-directors-tab.component.css']
})
export class ClientDetailsDirectorsTabComponent implements OnInit {
    columns: any[];
    directors: ClientDirector[] = [];
    loading: boolean;

    constructor(private clientService: ClientService) {
    }

    ngOnInit() {
        this.loading = true;
        this.initColumns();
        this.getDirectors().then(() => this.loading = false);

    }

    async getDirectors() {
        this.directors = await this.clientService.fetchDirectorsByClientId(this.getClient().id).toPromise();
    }

    getClient() {
        return this.clientService.getCurrentClient();
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
