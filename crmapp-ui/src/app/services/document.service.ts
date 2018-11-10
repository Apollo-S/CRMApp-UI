import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Document } from '../models/Document';
import { DocumentType } from '../models/DocumentType';
import {AppConst} from "../app-const";

@Injectable()
export class DocumentService {

    private readonly documentsUrl;
    private readonly headers;

    private _property$: BehaviorSubject<Document> = new BehaviorSubject({});

    set property(value: Document) {
        this._property$.next(value);
    }

    get property$(): Observable<Document> {
        return this._property$.asObservable();
    }

    constructor(private http: HttpClient,
                private appConst: AppConst) {
        this.documentsUrl = appConst.baseUrl + appConst.documentsUrl;
        this.headers = appConst.headersJSON;
    }

    getDocuments() {
        return this.http.get<Document[]>(this.documentsUrl, {headers: this.headers})
    }

    getDocumentsAccordingFilter(docTypes: number[], docStatuses: number[], clients: number[],
                                sortField: string, sortType: string) {
        // const url = this.documentsUrl + '/filter/docTypes=[' + docTypes + ']&docStatuses=[' + docStatuses +
        //     ']&clients=[' + clients + ']&sortField=' + sortField + '&sortType=' + sortType;
        const url = this.documentsUrl + '/filter/';
        let body = {docTypes, docStatuses, clients, sortField, sortType};
        return this.http.post<Document[]>(url, body ,{headers: this.headers});
    }

    getDocumentById(id: number): Observable<Document> {
        const url = `${this.documentsUrl}/${id}`;
        return this.http
            .get<Document>(url, {headers: this.headers})
            .pipe(
                tap(_ => console.log(`obtained document ID=${id}`)),
                catchError(this.handleError<Document>('getDocumentById'))
            );
    }

    addDocument(document: Document): Observable<Document> {
        const url = this.documentsUrl;
        return this.http.post<Document>(url, document, {headers: this.headers})
    }

    updateDocument(document: Document) {
        const url = this.documentsUrl + '/document.id';
        return this.http.put<Document>(url, document, {headers: this.headers})
    }

    deleteDocument(document: Document): Observable<void> {
        const url = `${this.documentsUrl}/${document.id}`;
        return this.http
            .delete(url, {headers: this.headers})
            .pipe(
                tap(_ => console.log(`deleted document ${document.number} (ID=${document.id})`)),
                catchError(this.handleError<any>('deleteDocument'))
            );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);
            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}
