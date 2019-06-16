import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ClientAgreement} from 'app/models/ClientAgreement';
import {Document} from 'app/models/Document';
import {AppConst} from "app/app-const";
import {BaseService} from "./base.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Agreement} from "../models/Agreement";

@Injectable()
export class AgreementService extends BaseService<Agreement> {

    private readonly agreementsUrl: string;
    readonly headers;
    private currentAgreement: BehaviorSubject<ClientAgreement> = new BehaviorSubject(new ClientAgreement());

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.headers = appConst.headersJSON;
        this.agreementsUrl = appConst.baseUrl + appConst.agreementsUrl + '/';
    }

    fetchAgreements() {
        return this.http.get<ClientAgreement[]>(this.agreementsUrl, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAgreement[]>(
                'Ошибка при загрузке списка договоров!'
            )));
    }

    fetchAgreementById(id: number) {
        const url = this.agreementsUrl + id;
        return this.http.get<ClientAgreement>(url, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAgreement>(
                'Ошибка при загрузке договора (ID=' + id + ')!'
            )));
    }

    getCurrentAgreement() {
        return this.currentAgreement.asObservable();
    }

    setCurrentAgreement(value: ClientAgreement) {
        this.currentAgreement.next(value);
    }

    getDocumentsByAgreementId(agreementId: number) {
        const url = this.agreementsUrl + agreementId + '/documents';
        return this.http.get<Document[]>(url, {headers: this.headers})
            .pipe(catchError(this.handleError<Document[]>(
                'Ошибка при загрузке документов!'
            )));
    }

    addAgreement(agreement: ClientAgreement) {
        const url = this.agreementsUrl;
        return this.http.post<ClientAgreement>(url, agreement, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAgreement>(
                'Ошибка при добавлении договора!'
            )));
    }

    updateAgreement(agreement: ClientAgreement) {
        const url = this.agreementsUrl + agreement.id;
        return this.http.put<ClientAgreement>(url, agreement, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAgreement>(
                'Ошибка при обновлении договора (ID=' + agreement.id + ')!'
            )));
    }

    deleteAgreement(agreementId: number) {
        const url = this.agreementsUrl + agreementId;
        return this.http.delete(url, {headers: this.headers})
            .pipe(catchError(this.handleError<ClientAgreement>(
                'Ошибка при удалении договора клиента (ID=' + agreementId + ')!'
            )));
    }

}
