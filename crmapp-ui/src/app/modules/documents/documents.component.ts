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
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-documents',
    templateUrl: './documents.component.html',
    styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
    // filterForm: FormGroup;
    clients: Client[] = [];
    documents: Document[] = [];
    docTypes: DocumentType[] = [];
    docStatuses: DocumentStatus[] = [];
    sortTypes: SelectItem[] = [];
    selectedDocTypes: DocumentType[] = [];
    selectedDocStatuses: DocumentStatus[] = [];
    selectedClients: Client[] = [];
    columns: any[] = [];
    items: MenuItem[] = [];
    filterState: boolean = false;
    loadingState: boolean;
    selectedSortType: string = '';
    selectedSortField: any = '';

    constructor(private docService: DocumentService,
                private docTypeService: DocumentTypeService,
                private docStatusService: DocumentStatusService,
                private clientService: ClientService,
                private router: Router) {
    }

    ngOnInit() {
        this.loadingState = true;
        this.initColumns();
        this.getDocumentTypes();
        this.getDocumentStatuses();
        this.getClients();
        // this.getDocuments();
        this.useFilter("id", "asc");
        this.initSortTypes();
    }

    private getDocuments() {
        this.docService.getDocuments()
            .subscribe(
                documents => this.documents = documents
            );
    }

    useFilter(sortField: string, sortType: string) {
        let docTypeIDs: number[] = this.getIDs(this.selectedDocTypes);
        let docStatusIDs: number[] = this.getIDs(this.selectedDocStatuses);
        let clientIDs: number[] = this.getIDs(this.selectedClients);
        this.docService.getDocumentsAccordingFilter(docTypeIDs, docStatusIDs, clientIDs, sortField, sortType)
            .subscribe(
                documents => {
                    this.documents = documents;
                    this.loadingState = false;
                }
            );
    }

    useSorting() {
        let docTypeIDs: number[] = this.getIDs(this.selectedDocTypes);
        let docStatusIDs: number[] = this.getIDs(this.selectedDocStatuses);
        let clientIDs: number[] = this.getIDs(this.selectedClients);
        this.docService.getDocumentsAccordingFilter(docTypeIDs, docStatusIDs, clientIDs, this.selectedSortField.field, this.selectedSortType)
            .subscribe(
                documents => this.documents = documents
            );
    }

    customSort(event: SortEvent) {
        let sortField = event.field;
        let sortType = (event.order == 1 ? "asc" : "desc");
        this.useFilter(sortField, sortType)
    }

    private getIDs(sourceArray: any[]): number[] {
        let arrLength: number = sourceArray.length;
        let result: number[] = [arrLength];
        for (let index = 0; index < arrLength; index++) {
            result[index] = sourceArray[index].id;
        }
        return result;
    }

    private getDocumentTypes() {
        this.docTypeService.getDocumentTypes()
            .subscribe(
                docTypes => this.docTypes = docTypes
            );
    }

    private getDocumentStatuses() {
        this.docStatusService.getDocumentStatuses()
            .subscribe(
                docStatuses => this.docStatuses = docStatuses
            );
    }

    private getClients() {
        return this.clientService.fetchClients().subscribe(
            clients => this.clients = clients
        );
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
        this.selectedSortField = this.columns[0];
    }

    private initSortTypes() {
        this.sortTypes = [
            {label: 'Возрастание', value: 'asc'},
            {label: 'Убывание', value: 'desc'}
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
        this.selectedClients = [];
        this.selectedDocTypes = [];
        this.selectedDocStatuses = [];
    }

    changeFilterState(state: boolean) {
        this.filterState = state;
    }

    refresh() {
        this.ngOnInit();
    }
}
