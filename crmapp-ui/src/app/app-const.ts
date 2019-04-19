import {HttpHeaders} from "@angular/common/http";

export class AppConst {

    headersJSON = new HttpHeaders({'Content-Type': 'application/json'});
    baseUrl = '/api';
    clientsUrl = '/clients';
    static ADD_CLIENT_URL = 'clients/add';
    static ADD_AGREEMENT_URL = 'agreements/add';
    agreementsUrl = '/agreements';
    documentsUrl = '/documents';
    postsUrl = '/posts';
    countriesUrl = '/countries';
    docStatusesUrl = '/document-statuses';
    agreementTypesUrl = '/agreement-types';

}
