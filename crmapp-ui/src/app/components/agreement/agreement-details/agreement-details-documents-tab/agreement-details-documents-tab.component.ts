import { Component, OnInit } from '@angular/core';
import { ClientAgreement } from '../../../../models/ClientAgreement';
import { AgreementService } from '../../../../services/agreement.service';
import { Document } from '../../../../models/Document';
import { DocumentService } from '../../../../services/document.service';
import { DocumentTypeService } from '../../../../services/document-type.service';
import { DocumentStatusService } from '../../../../services/document-status.service';

@Component({
  selector: 'app-agreement-details-documents-tab',
  templateUrl: './agreement-details-documents-tab.component.html',
  styleUrls: ['./agreement-details-documents-tab.component.css']
})
export class AgreementDetailsDocumentsTabComponent implements OnInit {
  agreement: ClientAgreement;
  documents: Document[] = [];
  columns: any[] = [];

    constructor(private agreementService: AgreementService,
                private docService: DocumentService,
                private docTypeService: DocumentTypeService,
                private docStatusService: DocumentStatusService) {
        // this.agreement = service.getAgreement();
        agreementService.emitterAgreement.subscribe(
            agreement => {
                this.agreement = agreement;
                this.getDocumentsByAgreementId(agreement.id);
            }
        )
    }

  ngOnInit() { 
    this.initColumns();
  }

  private getDocumentsByAgreementId(agreementId: number) {
    this.agreementService.getDocumentsByAgreementId(agreementId)
      .subscribe(
        documents => this.documents = documents
      );
  }

  private initColumns() {
    this.columns = [
      { field: 'id', header: 'ID', colStyle: 'text-align:center' },
      { field: 'docType.shortTitle', header: 'Тип документа', colStyle: 'text-align:center' },
      { field: 'number', header: '№', colStyle: 'text-align:center' },
      { field: 'amount', header: 'Сумма', colStyle: 'text-align:center' },
      { field: 'dated', header: 'Дата', colStyle: 'text-align:center' },
      { field: 'paymentDate', header: 'Дата оплаты', colStyle: 'paid' },
      { field: 'status.status', header: 'Статус', colStyle: 'text-align:center' }
    ];
  }

}