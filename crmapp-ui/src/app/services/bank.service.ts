import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {AppConst} from "app/app-const";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Bank} from "app/models/Bank";
import {catchError} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class BankService extends BaseService<Bank> {

    readonly headers: any;
    private readonly banksUrl: string;

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.banksUrl = appConst.baseUrl + appConst.banksUrl + '/';
        this.headers = appConst.headersJSON;
    }

    fetchBanks() {
        return this.http.get<Bank[]>(this.banksUrl, {headers: this.headers})
            .pipe(catchError(this.handleError<Bank[]>(
                'Ошибка при загрузке списка банков!'
            )));
    }

    fetchBankById(id: number) {
        return this.http.get<Bank>(this.banksUrl + id, {headers: this.headers})
            .pipe(catchError(this.handleError<Bank>(
                'Ошибка при загрузке инфо о банке с ID = ' + id + '!'
            )));
    }

    addBank(bank: Bank) {
        return this.http.post<Bank>(this.banksUrl, bank, {headers: this.headers})
            .pipe(catchError(this.handleError<Bank>(
                'Ошибка при добавлении информации о банке!'
            )));
    }

    updateBank(bank: Bank) {
        return this.http.put<Bank>(this.banksUrl + bank.id, bank, {headers: this.headers})
            .pipe(catchError(this.handleError<Bank>(
                'Ошибка при обновлении инфо о банке с ID = ' + bank.id + '!'
            )));
    }

    deleteBank(id: number) {
        return this.http.delete(this.banksUrl + id, {headers: this.headers})
            .pipe(catchError(this.handleError<Bank>(
                'Ошибка при удалении банка с ID = ' + id + '!'
            )));
    }

}
