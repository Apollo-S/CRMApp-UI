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
    sortField: string;
    title: string = 'Клиенты';
    buttonTitle = {add: 'Новый', edit: 'Редакт.', additional: 'Прочее'};
    autoLayout = true;
    rowHover = true;
    paginator = false;
    reorderableColumns = true;
    responsive = true;
    rows = 0;

    constructor(public clientService: ClientService) {
        this.initColumns();
        this.initMenu();
        this.sortField = this.columns[0].field;
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
    
    private initColumns() {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'code', header: 'Наименование'},
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
