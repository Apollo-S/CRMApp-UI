import {Component, OnInit} from '@angular/core';
import {ClientService} from 'app/services/client.service';
import {MenuItem} from 'primeng/api';
import {Client} from "app/models/Client";
import {SubscriptionService} from "app/services/subscription.service";

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css'],
    providers: [ClientService]
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
    selectedItem: any;

    constructor(public clientService: ClientService,
                private subscriptionService: SubscriptionService) {
        this.initColumns();
        this.initMenu();
        this.sortField = this.columns[0].field;
    }

    ngOnInit() {
        this.loading = true;
        this.refreshDatasource().then(() => {
            this.loading = false;
            this.subscriptionService.getCurrentClient().subscribe(
                (item) => this.selectedItem = item
            );
        });
    }

    refreshDatasource() {
        return this.clientService.fetchClients().toPromise().then(
            clients => this.clients = clients);
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
