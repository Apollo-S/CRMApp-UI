import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {MenuItem} from 'primeng/api';
import {Client} from "../../models/Client";

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
    columns = [];
    items: MenuItem[] = [];
    clients: Client[] = [];
    loading: boolean;

    constructor(public clientService: ClientService) {
        this.initColumns();
        this.initMenu();
    }

    ngOnInit() {
        this.refreshDatasource();
    }

    refreshDatasource() {
        this.loading = true;
        this.clientService.fetchClients().subscribe(
            clients => {
                this.clients = clients;
                this.loading = false;
            });
    }

    getClients() {
        return this.clientService.getClients();
    }

    private initColumns() {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'alias', header: 'Наименование'},
            {field: 'title', header: 'Полное наименование'},
            {field: 'edrpou', header: 'ЕГРПОУ'}
        ];
    }

    private initMenu() {
        this.items = [
            {label: 'Договоры', icon: 'fa fa-file-text-o', title: 'agreements'},
            {label: 'Адресы', icon: 'fa fa-building-o', title: 'addresses'},
            {label: 'Руководители', icon: 'fa fa-user-o', title: 'directors'},
            {label: 'Банк. реквизиты', icon: 'fa fa-bank', title: 'accounts'}
        ];
    }

}
