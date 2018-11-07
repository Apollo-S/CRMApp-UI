import {HttpHeaders} from "@angular/common/http";

export class AppConst {

    headersJSON = new HttpHeaders({'Content-Type': 'application/json'});
    baseUrl = '/api';
    clientsUrl = '/clients';
    agreementsUrl = '/agreements';

}
