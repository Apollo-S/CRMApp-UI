import {Component, OnInit} from '@angular/core';
import {PersonService} from 'app/services/person.service';
import {Person} from 'app/models/Person';
import {MenuItem} from 'primeng/api';

@Component({
    selector: 'app-persons',
    templateUrl: './persons.component.html',
    styleUrls: ['./persons.component.css']
})
export class PersonsComponent implements OnInit {
    persons: Array<Person> = [];
    columns = [];
    items: Array<MenuItem> = [];

    constructor(private personService: PersonService) {
        this.getPersons();
    }

    ngOnInit() {
        this.initColumns();
        this.initMenu();
    }

    private getPersons() {
        this.personService.fetchAll()
            .subscribe(
                persons => this.persons = persons
            );
    }

    private initColumns(): any {
        this.columns = [
            {field: 'surname', header: 'Фамилия'},
            {field: 'firstname', header: 'Имя'},
            {field: 'lastname', header: 'Отчество'}
        ];
    }

    private initMenu() {
        this.items = [];
    }

}
