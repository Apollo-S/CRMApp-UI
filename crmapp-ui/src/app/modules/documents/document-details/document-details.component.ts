import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DocumentService} from "app/services/document.service";
import {Document} from "app/models/Document";
import {ConfirmationService, MessageService} from "primeng/api";
import {ClientService} from "app/services/client.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilService} from "app/services/util.service";
import {Client} from "app/models/Client";
import {ClientAgreement} from "app/models/ClientAgreement";
import {DocumentType} from "app/models/DocumentType";
import {DocumentTypeService} from "app/services/document-type.service";
import {DocumentStatus} from "../../../models/DocumentStatus";
import {DocumentStatusService} from "../../../services/document-status.service";

@Component({
    selector: 'app-document-details',
    templateUrl: './document-details.component.html',
    styleUrls: ['./document-details.component.css']
})
export class DocumentDetailsComponent implements OnInit {

    documentId: number;
    document: Document = {};
    clients: Client[] = [];
    agreements: ClientAgreement[] = [];
    docTypes: DocumentType[] = [];
    docStatuses: DocumentStatus[] = [];
    loadingState: boolean;
    documentForm: FormGroup;
    isNew: boolean = false;
    years: string;
    ru: any;
    editEnabled: boolean = false;

    constructor(private clientService: ClientService,
                private documentService: DocumentService,
                private docTypeService: DocumentTypeService,
                private docStatusService: DocumentStatusService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
        this.initDocumentForm();
        this.ru = UtilService.getCalendarLocalSet();
        this.years = UtilService.getCalendarYears(5);
    }

    ngOnInit() {
        this.fetchData();
        this.documentId = +this.route.snapshot.params.id;
        if (this.documentId) {
            this.loadingState = true;
            this.fetchDataByDocumentId(this.documentId)
                .then(() => {
                    this.documentForm.controls.client.setValue(
                        this.clients.find(client => client.id === this.document.clientId)
                    );
                    this.documentForm.controls.agreement.setValue(
                        this.agreements.find(agreement => agreement.id === this.document.agreementId)
                    );
                    this.documentForm.controls.docType.setValue(this.document.docType);
                    this.documentForm.controls.number.setValue(this.document.number);
                    this.documentForm.controls.status.setValue(this.document.status);
                    this.documentForm.controls.amount.setValue(this.document.amount);
                    this.documentForm.controls.dated.setValue(new Date(this.document.dated));
                    this.documentForm.controls.paymentDate.setValue(
                        this.document.paymentDate === null ? null : new Date(this.document.paymentDate)
                    );
                    this.documentForm.controls.passingDate.setValue(
                        this.document.passingDate === null ? null : new Date(this.document.passingDate)
                    );
                    this.documentForm.controls.comment.setValue(this.document.comment);
                    this.loadingState = false;
                })
        } else {
            this.isNew = true;
        }
    }

    private async fetchData() {
        let docTypesPromise = this.docTypeService.getDocumentTypes().toPromise();
        let docStatusesPromise = this.docStatusService.getDocumentStatuses().toPromise();
        let clientsPromise = this.clientService.fetchClients().toPromise();
        this.docTypes = await docTypesPromise;
        this.docStatuses = await docStatusesPromise;
        this.clients = await clientsPromise;
    }

    private async fetchDataByDocumentId(documentId: number) {
        let documentPromise = this.documentService.getDocumentById(documentId).toPromise();
        this.document = await documentPromise;
        let agreementsPromise = this.clientService.fetchAgreementsByClientId(this.document.clientId).toPromise();
        this.agreements = await agreementsPromise;
    }

    onSubmit() {
        let document: Document = new Document();
        document.agreementId = this.documentForm.controls.agreement.value.id;
        document.number = this.documentForm.controls.number.value;
        document.amount = this.documentForm.controls.amount.value;
        document.dated = this.documentForm.controls.dated.value;
        document.status = this.documentForm.controls.status.value;
        document.paymentDate = this.documentForm.controls.paymentDate.value;
        document.passingDate = this.documentForm.controls.passingDate.value;
        document.docType = this.documentForm.controls.docType.value;
        document.agreement = this.documentForm.controls.agreement.value;
        document.comment = this.documentForm.controls.comment.value;
        if (this.isNew) {
            this.save(document);
        } else {
            document.id = this.documentId;
            this.update(document);
        }
    }

    initDocumentForm() {
        this.documentForm = this.formBuilder.group({
            client: ['', Validators.compose([
                Validators.required
            ])],
            agreement: ['', Validators.compose([
                Validators.required
            ])],
            docType: ['', Validators.compose([
                Validators.required
            ])],
            amount: [''],
            dated: ['', Validators.compose([
                Validators.required,
            ])],
            paymentDate: [''],
            passingDate: [''],
            number: ['', Validators.compose([
                Validators.required,
            ])],
            status: ['', Validators.compose([
                Validators.required,
            ])],
            comment: [''],
        });
    }

    save(document: Document) {
        this.documentService.addDocument(document).subscribe(
            response => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно!',
                    detail: 'Документ успешно добавлен (ID=' + response.id + ')'
                });
                this.clientService.goToUrl(['/documents', response.id]);
            }
        )
    }

    update(document: Document) {
        this.documentService.updateDocument(document).subscribe(
            response => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно!',
                    detail: 'Документ успешно изменен (ID=' + response.id + ')'
                });
                this.document = response;
            })
    }

    handleChange(event) {
        this.editEnabled = event.checked;
    }

    changeClient(event) {
        let client = event.value;
        this.clientService.fetchAgreementsByClientId(client.id).toPromise()
            .then(agreements => {
                this.agreements = agreements;
                this.documentForm.controls.agreement.setValue(undefined);
            })

    }

    checkAllowPaymentDate() {
        return this.documentForm.controls.status.value.allowPaymentDate;
    }

    checkAllowPassingDate() {
        return this.documentForm.controls.status.value.allowPassingDate;
    }

    confirmDeleting() {
        let msg = 'Документ \"' + this.document.number + '\" (ID=' + this.document.id + ') ';
        this.confirmationService.confirm({
            message: 'Действительно удалить ' + this.document.number + ' ?',
            header: 'Удаление',
            icon: 'fa fa-trash',
            accept: () => {
                this.documentService.deleteDocument(this.document.id).toPromise()
                    .then(
                        () => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Успешно!',
                                detail: (msg + ' успешно удален')
                            });
                            this.documentService.goToUrl(['/documents']);
                        })
            },
            reject: () => {
            }
        });
    }

}
