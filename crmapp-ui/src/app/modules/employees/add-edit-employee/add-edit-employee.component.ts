import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from "app/services/employee.service";
import {Subscription} from "rxjs";
import {MenuItem, MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "app/models/Employee";
import {SubscriptionService} from "app/services/subscription.service";
import {ActivatedRoute} from "@angular/router";
import {AppConst} from "app/app-const";
import {PersonService} from "app/services/person.service";
import {Person} from "app/models/Person";
import {UtilService} from "app/services/util.service";
import {Post} from "app/models/Post";
import {PostService} from "app/services/post.service";

@Component({
    selector: 'app-add-edit-employee',
    templateUrl: './add-edit-employee.component.html',
    styleUrls: ['./add-edit-employee.component.css'],
    providers: [EmployeeService, PersonService, PostService]
})
export class AddEditEmployeeComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    employee: Employee = new Employee();
    posts: Post[] = [];
    isNew: boolean = false;
    tabs: MenuItem[] = [];
    employeeForm: FormGroup;
    loadingState: boolean;
    persons: Person[] = [];
    message = {
        personEmpty: 'Выберите сотрудника',
        hireDateEmpty: 'Обязательное поле',
        postEmpty: 'Выберите должность'
    };
    ru: any;
    years: any;

    constructor(private subscriptionService: SubscriptionService,
                private employeeService: EmployeeService,
                private personService: PersonService,
                private postService: PostService,
                private formBuilder: FormBuilder,
                private messageService: MessageService,
                private route: ActivatedRoute) {
        this.initEmployeeForm();
        this.ru = UtilService.getCalendarLocalSet();
        this.years = UtilService.getCalendarYears(5);
    }

    ngOnInit() {
        this.isNew = (this.route.routeConfig.path === AppConst.ADD_EMPLOYEE_URL);
        this.loadingState = true;
        this.fetchDataAsync().then(() => {
            if (!this.isNew) {
                this.subscription = this.subscriptionService.getCurrentEmployee()
                    .subscribe(employee => {
                        this.employee = employee;
                        this.employeeForm.controls.person.setValue(employee.person);
                        this.employeeForm.controls.hireDate.setValue(new Date(employee.hireDate));
                        this.employeeForm.controls.entrepreneur.setValue(employee.entrepreneur);
                        this.employeeForm.controls.post.setValue(employee.post);
                        this.loadingState = false;
                    });
            } else {
                this.initTabs();
                this.loadingState = false;
            }
        });
    }

    async fetchDataAsync() {
        let personsPromise = this.personService.fetchAll().toPromise();
        let postsPromise = this.postService.getPosts().toPromise();
        this.persons = await personsPromise;
        this.posts = await postsPromise;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        let employee: Employee = new Employee();
        if (this.isNew) {
            this.save(employee);
        } else {
            employee.id = this.employee.id;
            this.update(employee);
        }
    }

    private save(employee: Employee) {
    }

    private update(employee: Employee) {
    }

    private initEmployeeForm() {
        this.employeeForm = this.formBuilder.group({
            person: ['', Validators.compose([
                Validators.required,
                Validators.nullValidator
            ])],
            post: ['', Validators.compose([
                Validators.required,
                Validators.nullValidator
            ])],
            entrepreneur: [''],
            hireDate: ['', Validators.compose([
                Validators.required,
                Validators.nullValidator
            ])]
        });
    }

    goBackToEmployee() {
        this.employeeService.goToUrl([this.employee.url]);
    }

    private initTabs() {
        this.tabs = [
            {label: 'Основные данные', icon: 'fa fa-address-card-o', disabled: true},
            {label: 'Адресы', icon: 'fa fa-building-o', disabled: true},
            {label: 'Банковские реквизиты', icon: 'fa fa-bank', disabled: true},
            {label: 'Отпуски', icon: 'fa fa-user-o', disabled: true},
            {label: 'Больничные листы', icon: 'fa fa-user-o', disabled: true}
        ];
    }

}
