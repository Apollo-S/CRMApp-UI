import {Component, OnInit} from '@angular/core';
import {DocumentService} from 'app/services/document.service';
import {DocumentTypeService} from 'app/services/document-type.service';
import {Router} from '@angular/router';
import {Document} from 'app/models/Document';
import {DocumentStatus} from 'app/models/DocumentStatus';
import {DocumentType} from 'app/models/DocumentType';
import {DocumentStatusService} from 'app/services/document-status.service';
import {ClientService} from 'app/services/client.service';
import {MenuItem, SortEvent, SelectItem} from 'primeng/api';
import {Client} from 'app/models/Client';
import {UtilService} from "app/services/util.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
    clients: Client[] = [];
    documents: Document[] = [];
    docTypes: DocumentType[] = [];
    docStatuses: DocumentStatus[] = [];
    sortTypes: SelectItem[] = [];
    columns: any[] = [];
    items: MenuItem[] = [];
    loadingState: boolean;
    selectedSortType: string = '';
    selectedSortField: any = '';
    years: string;
    ru: any;
    filterForm: FormGroup;

    constructor(public docService: DocumentService,
                private docTypeService: DocumentTypeService,
                private docStatusService: DocumentStatusService,
                private clientService: ClientService,
                private router: Router,
                private formBuilder: FormBuilder) {
        this.initFilterForm();
        this.initColumns();
        this.initSortTypes();
        this.ru = UtilService.getCalendarLocalSet();
        this.years = UtilService.getCalendarYears(5);
    }

    ngOnInit() {
        this.loadingState = true;
        this.takeFilterState();
        this.fetchData();
        this.useFilter("id", "asc");
    }

    onSubmit() {
        this.saveFilterState();
        this.useFilter("id", "asc");
    }

    private getDocuments() {
        this.docService.getDocuments()
            .subscribe(
                documents => this.documents = documents
            );
    }

    useFilter(sortField: string, sortType: string) {
        let docTypeIDs: number[] = this.docService.getIDs(this.docService.getSelectedDocTypes());
        let docStatusIDs: number[] = this.docService.getIDs(this.docService.getSelectedDocStatuses());
        let clientIDs: number[] = this.docService.getIDs(this.docService.getSelectedClients());
        let datedStart: Date = this.docService.getDatedStart();
        let datedFinal: Date = this.docService.getDatedFinal();
        this.docService.getDocumentsAccordingFilter(docTypeIDs, docStatusIDs, clientIDs, datedStart, datedFinal, sortField, sortType)
            .subscribe(
                documents => {
                    this.documents = documents;
                    this.loadingState = false;
                }
            );
    }

    private takeFilterState() {
        this.filterForm.controls.selectedClients.setValue(this.docService.getSelectedClients());
        this.filterForm.controls.selectedDocTypes.setValue(this.docService.getSelectedDocTypes());
        this.filterForm.controls.selectedDocStatuses.setValue(this.docService.getSelectedDocStatuses());
        this.filterForm.controls.datedStart.setValue(this.docService.getDatedStart());
        this.filterForm.controls.datedFinal.setValue(this.docService.getDatedFinal());
    }

    private saveFilterState() {
        this.docService.setSelectedDocTypes(this.filterForm.controls.selectedDocTypes.value);
        this.docService.setSelectedDocStatuses(this.filterForm.controls.selectedDocStatuses.value);
        this.docService.setSelectedClients(this.filterForm.controls.selectedClients.value);
        this.docService.setDatedStart(this.filterForm.controls.datedStart.value);
        this.docService.setDatedFinal(this.filterForm.controls.datedFinal.value);
    }

    customSort(event: SortEvent) {
        let sortField = event.field;
        let sortType = (event.order == 1 ? "asc" : "desc");
        this.useFilter(sortField, sortType)
    }

    private async fetchData() {
        let clientsPromise = this.clientService.fetchClients().toPromise();
        let docTypesPromise = this.docTypeService.getDocumentTypes().toPromise();
        let docDocStatusesPromise = this.docStatusService.getDocumentStatuses().toPromise();
        this.docTypes = await docTypesPromise;
        this.docStatuses = await docDocStatusesPromise;
        this.clients = await clientsPromise;
    }

    private initColumns() {
        this.columns = [
            {field: 'id', header: 'ID', colStyle: 'text-align:center'},
            {field: 'docType.shortTitle', header: 'Тип документа', colStyle: 'text-align:center'},
            {field: 'number', header: '№', colStyle: 'text-align:center'},
            {field: 'amount', header: 'Сумма', colStyle: 'text-align:center'},
            {field: 'dated', header: 'Дата', colStyle: 'text-align:center'},
            {field: 'paymentDate', header: 'Дата оплаты', colStyle: 'text-align:center'},
            {field: 'status.status', header: 'Статус', colStyle: 'text-align:center'},
            {field: 'passingDate', header: 'Дата передачи', colStyle: 'text-align:center'}
        ];
        this.selectedSortField = this.columns[0];
    }

    private initFilterForm() {
        this.filterForm = this.formBuilder.group({
            selectedClients: [''],
            selectedDocTypes: [''],
            selectedDocStatuses: [''],
            datedStart: [''],
            datedFinal: [''],
            paymentDateStart: [''],
            paymentDateFinal: [''],
            passingDateStart: [''],
            passingDateFinal: [''],
            selectedSortField: [''],
            selectedSortType: [''],
        });
    }

    private initSortTypes() {
        this.sortTypes = [
            {label: 'По возрастанию', value: 'asc'},
            {label: 'По убыванию', value: 'desc'}
        ];
        this.selectedSortType = 'asc';
    }

    private initMenu(id: any) {
        this.items = [];
    }

    goToEntry(url: string) {
        this.router.navigate([url]);
    }

    clearFilter() {
        this.docService.setSelectedClients([]);
        this.docService.setSelectedDocTypes([]);
        this.docService.setSelectedDocStatuses([]);
        this.docService.setDatedStart(null);
        this.docService.setDatedFinal(null);
        this.takeFilterState();
        this.useFilter("id", "asc");
    }

    changeFilterState() {
        this.docService.setFilterState(!this.docService.getFilterState());
    }

    refresh() {
        this.ngOnInit();
    }

}
