import {Component, OnInit} from '@angular/core';
import {AgreementService} from '../../services/agreement.service';
import {MenuItem} from 'primeng/api';
import {ClientAgreement} from "../../models/ClientAgreement";

@Component({
    selector: 'app-agreements',
    templateUrl: './agreements.component.html',
    styleUrls: ['./agreements.component.css']
})
export class AgreementsComponent implements OnInit {
    columns: Array<any> = [];
    items: Array<MenuItem> = [];
    rowGroupMetadata: any;
    agreements: ClientAgreement[];
    loading: boolean;

    constructor(private agreementService: AgreementService) {
        this.initColumns();
        this.initMenu();
    }

    ngOnInit() {
        this.loading = true;
        this.agreementService.fetchAgreements().toPromise().then(
            agreements => {
                this.agreements = agreements;
                this.updateRowGroupMetaData();
                this.loading = false;
        });
    }

    private initColumns() {
        this.columns = [
            {field: 'clientAlias', header: 'Контрагент', filterBy: 'contains'},
            {field: 'number', header: 'Номер', filterBy: 'contains'},
            {field: 'dateStart', header: 'Дата', filterBy: 'contains'}
        ];
    }

    private initMenu() {
        this.items = [
            {label: 'Связ. документы', icon: 'fa fa-file-text-o', title: 'documents'}
        ];
    }

    updateRowGroupMetaData() {
        this.rowGroupMetadata = {};
        if (this.agreements) {
            for (let i = 0; i < this.agreements.length; i++) {
                let rowData = this.agreements[i];
                let clientAlias = rowData.clientAlias;
                if (i == 0) {
                    this.rowGroupMetadata[clientAlias] = {index: 0, size: 1};
                } else {
                    let previousRowData = this.agreements[i - 1];
                    let previousRowGroup = previousRowData.clientAlias;
                    if (clientAlias === previousRowGroup)
                        this.rowGroupMetadata[clientAlias].size++;
                    else
                        this.rowGroupMetadata[clientAlias] = {index: i, size: 1};
                }
            }
        }
    }

}