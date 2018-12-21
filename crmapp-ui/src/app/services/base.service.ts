import {Router} from "@angular/router";
import {Observable, of} from "rxjs";
import {MessageService} from "primeng/api";

export abstract class BaseService {

    protected constructor(private router: Router,
                          private messageService: MessageService) {
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
