import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AppConst} from "app/app-const";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {BaseService} from "./base.service";
import {catchError} from "rxjs/operators";
import {CurrencyType} from "app/models/CurrencyType";

@Injectable({
    providedIn: 'root'
})
export class CurrencyTypeService extends BaseService<CurrencyType> {

    readonly headers: any;
    private readonly currencyTypesUrl: string;

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.currencyTypesUrl = appConst.baseUrl + appConst.currencyTypesUrl + '/';
        this.headers = appConst.headersJSON;
    }

    fetchCurrencyTypes() {
        return this.http.get<CurrencyType[]>(this.currencyTypesUrl, {headers: this.headers})
            .pipe(catchError(this.handleError<CurrencyType[]>(
                'Ошибка при загрузке списка валют!'
            )));
    }

    fetchCurrencyTypeById(id: number) {
        return this.http.get<CurrencyType>(this.currencyTypesUrl + id, {headers: this.headers})
            .pipe(catchError(this.handleError<CurrencyType>(
                'Ошибка при загрузке валюты с ID = ' + id + '!'
            )));
    }

    addCurrencyType(curType: CurrencyType) {
        return this.http.post<CurrencyType>(this.currencyTypesUrl, curType, {headers: this.headers})
            .pipe(catchError(this.handleError<CurrencyType>(
                'Ошибка при добавлении валюты!'
            )));
    }

    updateCurrencyType(curType: CurrencyType) {
        return this.http.put<CurrencyType>(this.currencyTypesUrl + curType.id, curType, {headers: this.headers})
            .pipe(catchError(this.handleError<CurrencyType>(
                'Ошибка при обновлении валюты с ID = ' + curType.id + '!'
            )));
    }

    deleteCurrencyType(id: number) {
        return this.http.delete(this.currencyTypesUrl + id, {headers: this.headers})
            .pipe(catchError(this.handleError<CurrencyType>(
                'Ошибка при удалении валюты с ID = ' + id + '!'
            )));
    }

}
