import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientAgreement} from 'app/models/ClientAgreement';
import {AgreementService} from 'app/services/agreement.service';
import {Document} from 'app/models/Document';
import {DocumentService} from 'app/services/document.service';
import {DocumentTypeService} from 'app/services/document-type.service';
import {DocumentStatusService} from 'app/services/document-status.service';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-agreement-details-documents-tab',
    templateUrl: './agreement-details-documents-tab.component.html',
    styleUrls: ['./agreement-details-documents-tab.component.css']
})
export class AgreementDetailsDocumentsTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    agreement: ClientAgreement = new ClientAgreement();
    documents: Document[] = [];
    columns: any[] = [];
    loadingState: boolean;

    constructor(private agreementService: AgreementService,
                private docService: DocumentService,
                private docTypeService: DocumentTypeService,
                private docStatusService: DocumentStatusService) {
        this.initColumns();
    }

    ngOnInit() {
        this.loadingState = true;
        this.subscription = this.agreementService.getCurrentAgreement()
            .subscribe(agreement => {
                this.agreement = agreement;
                this.agreementService.getDocumentsByAgreementId(agreement.id)
                    .subscribe(documents => {
                        this.documents = documents;
                        this.loadingState = false;
                    });
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private initColumns() {
        this.columns = [
            {field: 'id', header: 'ID', colStyle: 'text-align:center'},
            {field: 'docType.shortTitle', header: 'Тип документа', colStyle: 'text-align:center'},
            {field: 'number', header: '№', colStyle: 'text-align:center'},
            {field: 'amount', header: 'Сумма', colStyle: 'text-align:center'},
            {field: 'dated', header: 'Дата', colStyle: 'text-align:center'},
            {field: 'paymentDate', header: 'Дата оплаты', colStyle: 'paid'},
            {field: 'status.status', header: 'Статус', colStyle: 'text-align:center'}
        ];
    }

}