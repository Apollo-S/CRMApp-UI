import {Component, OnInit} from '@angular/core';
import {AgreementService} from 'app/services/agreement.service';
import {MenuItem} from 'primeng/api';
import {Agreement} from "app/models/Agreement";

@Component({
    selector: 'app-agreements',
    templateUrl: './agreements.component.html',
    styleUrls: ['./agreements.component.css']
})
export class AgreementsComponent implements OnInit {
    columns: any[] = [];
    items: MenuItem[] = [];
    agreements: Agreement[] = [];
    loading: boolean;
    sortField: string;
    title: string;

    constructor(private agreementService: AgreementService) {
        this.initColumns();
        this.initMenu();
        this.sortField = this.columns[0].field;
    }

    ngOnInit() {
        this.loading = true;
        this.agreementService.fetchAgreements().toPromise().then(
            agreements => {
                this.agreements = agreements;
                this.loading = false;
            });
    }

    private initColumns() {
        this.columns = [
            {field: "clientCode", header: 'Контрагент', filterBy: 'contains'},
            {field: 'number', header: 'Номер', filterBy: 'contains'},
            {field: 'dateStart', header: 'Дата', filterBy: 'contains'},
        ];
    }

    private initMenu() {
        this.items = [
            {label: 'Связ. документы', icon: 'fa fa-file-text-o', title: 'documents'},
        ];
    }

}
