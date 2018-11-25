import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../services/client.service';

@Component({
    selector: 'app-client-details-directors-tab',
    templateUrl: './client-details-directors-tab.component.html',
    styleUrls: ['./client-details-directors-tab.component.css']
})
export class ClientDetailsDirectorsTabComponent implements OnInit {
    columns: any[];

    constructor(private clientService: ClientService) {
    }

    ngOnInit() {
        this.initColumns();
    }

    getDirectors() {
        return this.clientService.getDirectors();
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
