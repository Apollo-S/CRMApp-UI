import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Document } from '../models/Document';
import { DocumentType } from '../models/DocumentType';
import {AppConst} from "../app-const";
import {ClientAccount} from "../models/ClientAccount";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {BaseService} from "./base.service";
import {DocumentStatus} from "../models/DocumentStatus";
import {Client} from "../models/Client";

@Injectable()
export class DocumentService extends BaseService{

    private readonly documentsUrl;
    private readonly headers;
    protected _selectedDocTypes: DocumentType[] = [];
    protected _selectedDocStatuses: DocumentStatus[] = [];
    protected _selectedClients: Client[] = [];
    private _filterState: boolean = false;

    private _property$: BehaviorSubject<Document> = new BehaviorSubject({});

    set property(value: Document) {
        this._property$.next(value);
    }

    get property$(): Observable<Document> {
        return this._property$.asObservable();
    }

    constructor(private http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService);
        this.documentsUrl = appConst.baseUrl + appConst.documentsUrl + '/';
        this.headers = appConst.headersJSON;
    }

    getSelectedClients(): Client[] {
        return this._selectedClients;
    }

    setSelectedClients(value: Client[]) {
        this._selectedClients = value;
    }
    getSelectedDocStatuses(): DocumentStatus[] {
        return this._selectedDocStatuses;
    }

    setSelectedDocStatuses(value: DocumentStatus[]) {
        this._selectedDocStatuses = value;
    }

    getSelectedDocTypes(): DocumentType[] {
        return this._selectedDocTypes;
    }

    setSelectedDocTypes(value: DocumentType[]) {
        this._selectedDocTypes = value;
    }

    getFilterState(): boolean {
        return this._filterState;
    }

    setFilterState(value: boolean) {
        this._filterState = value;
    }

    getIDs(sourceArray: any[]): number[] {
        let arrLength: number = sourceArray.length;
        let result: number[] = [arrLength];
        for (let index = 0; index < arrLength; index++) {
            result[index] = sourceArray[index].id;
        }
        return result;
    }

    getDocuments() {
        return this.http.get<Document[]>(this.documentsUrl, {headers: this.headers})
    }

    getDocumentsAccordingFilter(docTypes: number[], docStatuses: number[], clients: number[],
                                sortField: string, sortType: string) {
        const url = this.documentsUrl + 'filter/';
        let body = {docTypes, docStatuses, clients, sortField, sortType};
        return this.http.post<Document[]>(url, body ,{headers: this.headers})
            .pipe(catchError(this.handleError<Document[]>(
                'Ошибка при получении списка документов!'
            )));
    }

    getDocumentById(id: number) {
        const url = this.documentsUrl + id;
        return this.http.get<Document>(url, {headers: this.headers})
            .pipe(catchError(this.handleError<Document>(
                'Ошибка при получении данных о документе!'
            )));
    }

    addDocument(document: Document): Observable<Document> {
        const url = this.documentsUrl;
        return this.http.post<Document>(url, document, {headers: this.headers})
    }

    updateDocument(document: Document) {
        const url = this.documentsUrl + document.id;
        return this.http.put<Document>(url, document, {headers: this.headers})
            .pipe(catchError(this.handleError<Document>(
                'Ошибка при обновлении документа!'
            )));
    }

    deleteDocument(documentId: number) {
        const url = this.documentsUrl + documentId;
        return this.http.delete(url, {headers: this.headers})
            .pipe(catchError(this.handleError<any>(
                'Ошибка при удалении документа!'
            )));
    }

}
