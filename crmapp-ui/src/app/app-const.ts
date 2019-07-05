import {HttpHeaders} from "@angular/common/http";

export class AppConst {

    static ADD_CLIENT_URL = 'clients/add';
    static ADD_AGREEMENT_URL = 'agreements/add';
    static ADD_EMPLOYEE_URL = 'employees/add';

    headersJSON = new HttpHeaders({'Content-Type': 'application/json'});
    baseUrl = '/api';
    clientsUrl = '/clients';
    agreementsUrl = '/agreements';
    documentsUrl = '/documents';
    postsUrl = '/posts';
    countriesUrl = '/countries';
    docStatusesUrl = '/document-statuses';
    agreementTypesUrl = '/agreement-types';
    currencyTypesUrl = '/currency-types';
    banksUrl = '/banks';
    employeesUrl = '/employees';
    personsUrl = '/api/persons';
}
