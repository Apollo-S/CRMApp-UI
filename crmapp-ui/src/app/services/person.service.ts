import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Person} from 'app/models/Person';
import {AppConst} from "app/app-const";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {BaseService} from "./base.service";

@Injectable()
export class PersonService extends BaseService<Person> {

    private readonly personsUrl: string;

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.personsUrl = appConst.baseUrl + appConst.personsUrl + '/';
    }

    fetchAll() {
        return super.fetchAll(this.personsUrl);
    }

    fetchOne(id: number) {
        return super.fetchOne(this.personsUrl + id);
    }

    addOne(person: Person) {
        return super.save(this.personsUrl, person);
    }

    updateOne(person: Person) {
        return super.update(this.personsUrl + person.id, person);
    }

    deleteOne(id: number) {
        return super.delete(this.personsUrl + id);
    }

}
