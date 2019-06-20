import {Injectable} from '@angular/core';
import {BaseService} from "./base.service";
import {AppConst} from "../app-const";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {Country} from "../models/Country";

@Injectable()
export class CountryService extends BaseService<Country> {

    private readonly countriesUrl: string;

    constructor(http: HttpClient,
                router: Router,
                messageService: MessageService,
                private appConst: AppConst) {
        super(router, messageService, http);
        this.countriesUrl = appConst.baseUrl + appConst.countriesUrl + '/';
    }

    fetchAllCountries() {
        return super.fetchAll(this.countriesUrl);
    }

    fetchCountryBy(id: number) {
        const url = this.countriesUrl + id;
        return super.fetchOne(url);
    }



}
