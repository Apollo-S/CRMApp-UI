import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {DocumentStatus} from 'app/models/DocumentStatus';
import {AppConst} from "app/app-const";
import {BaseService} from "./base.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Injectable()
export class DocumentStatusService extends BaseService<DocumentStatus> {

    private readonly docStatusesUrl;
    protected readonly headers;

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.docStatusesUrl = appConst.baseUrl + appConst.docStatusesUrl + '/';
        this.headers = appConst.headersJSON;
    }

    getDocumentStatuses() {
        const url = this.docStatusesUrl;
        return this.http.get<DocumentStatus[]>(url, {headers: this.headers})
            .pipe(catchError(this.handleError<DocumentStatus[]>(
                'Ошибка при загрузке списка статусов!'
            )));
    }

    getDocumentStatusById(statusId: number) {
        const url = this.docStatusesUrl + statusId;
        return this.http.get<DocumentStatus>(url, {headers: this.headers})
            .pipe(catchError(this.handleError<DocumentStatus>(
                'Ошибка при загрузке статуса с ID=' + statusId
            )));
    }

}
