import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {MessageService} from "primeng/api";
import {Client} from "../models/Client";
import {catchError} from "rxjs/operators";
import {AppConst} from "../app-const";
import {HttpClient, HttpHeaders} from "@angular/common/http";

export abstract class BaseService<T> {

    protected readonly headers = new HttpHeaders({'Content-Type': 'application/json'});

    protected constructor(protected router: Router,
                          protected messageService: MessageService,
                          protected http: HttpClient) {
    }

    fetchAll(url) {
        return this.http.get<T[]>(url, {headers: this.headers})
            .pipe(catchError(this.handleError<T[]>(
                'Error while fetching all'
            )));
    }

    goToUrl(address: any[]) {
       return this.router.navigate(address);
    }

    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            this.messageService.add({
                sticky: true,
                severity: 'error',
                summary: operation,
                detail: 'Failed: ' + error.message
            });
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        }
    }

}
