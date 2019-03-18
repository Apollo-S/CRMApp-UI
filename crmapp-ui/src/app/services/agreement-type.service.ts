import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AppConst} from "../app-const";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AgreementTypeService extends BaseService {

    private headers: HttpHeaders;
    private agreementTypesUrl: string;

    constructor(private http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService);
        this.headers = appConst.headersJSON;
        this.agreementTypesUrl = appConst.baseUrl + appConst.agreementTypesUrl + '/';
    }

    getAgreementTypes() {
        return this.http.get<any>(this.agreementTypesUrl, {headers: this.headers})
            .pipe(catchError(this.handleError<any>(
                'Ошибка при получении типов договоров!'
            )));
    }

    getAgreementTypesById(id: number) {
        const url = this.agreementTypesUrl + id;
        return this.http.get<any>(url, {headers: this.headers})
            .pipe(catchError(this.handleError<any>(
                'Ошибка при получении типа договора с ID=' +  id + '!'
            )));
    }

}
