import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "app/services/client.service";
import {Client} from "app/models/Client";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {AppConst} from "app/app-const";
import {SubscriptionService} from "app/services/subscription.service";

@Component({
    selector: 'app-add-edit-client',
    templateUrl: './add-edit-client.component.html',
    styleUrls: ['./add-edit-client.component.css'],
    providers: [ClientService]
})
export class AddEditClientComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();
    client: Client = new Client();
    isNew: boolean = false;
    tabs: MenuItem[];
    clientForm: FormGroup;
    loadingState: boolean;

    constructor(private subscriptionService: SubscriptionService,
                private clientService: ClientService,
                private formBuilder: FormBuilder,
                private messageService: MessageService,
                private route: ActivatedRoute) {
        this.initClientForm();
    }

    ngOnInit() {
        this.isNew = (this.route.routeConfig.path === AppConst.ADD_CLIENT_URL);
        this.loadingState = true;
        if (!this.isNew) {
            this.subscription = this.subscriptionService.getCurrentClient()
                .subscribe(client => {
                    this.client = client;
                    this.clientForm.controls.title.setValue(this.client.title);
                    this.clientForm.controls.code.setValue(this.client.code);
                    this.clientForm.controls.edrpou.setValue(this.client.edrpou);
                    this.clientForm.controls.vatCertificate.setValue(this.client.vatCertificate);
                    this.clientForm.controls.inn.setValue(this.client.inn);
                    this.loadingState = false;
                });
        } else {
            this.initTabs();
            this.loadingState = false;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        if (this.isNew) {
            this.save();
        } else {
            this.update();
        }
    }

    private initClientForm() {
        this.clientForm = this.formBuilder.group({
            title: ['', Validators.compose([
                Validators.required,
                Validators.minLength(2)
            ])],
            code: ['', Validators.compose([
                Validators.required,
                Validators.minLength(2)
            ])],
            edrpou: ['', Validators.compose([
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(14)
            ])],
            inn: ['', Validators.compose([
                Validators.maxLength(14)
            ])],
            vatCertificate: ['', Validators.compose([
                Validators.maxLength(20)
            ])]
        });
    }

    private initTabs() {
        this.tabs = [
            {label: 'Основные данные', icon: 'fa fa-address-card-o', disabled: true},
            {label: 'Адресы', icon: 'fa fa-building-o', disabled: true},
            {label: 'Банковские реквизиты', icon: 'fa fa-bank', disabled: true},
            {label: 'Руководители', icon: 'fa fa-user-o', disabled: true},
            {label: 'Договоры', icon: 'fa fa-file-text-o', disabled: true}
        ];
    }

    private save() {
        let client: Client = {
            title: this.clientForm.controls.title.value,
            code: this.clientForm.controls.code.value,
            edrpou: this.clientForm.controls.edrpou.value,
            vatCertificate: this.clientForm.controls.vatCertificate.value,
            inn: this.clientForm.controls.inn.value
        };
        this.clientService.addClient(client).toPromise()
            .then(response => {
                let msg = 'Клиент ' + response.code + ' успешно добавлен (ID=' + response.id + ')';
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно!',
                    detail: msg
                });
                this.clientService.goToUrl([response.url]);
            })
            .catch(() => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ошибка!',
                    detail: 'Клиент не добавлен'
                });
            });
    }

    private update() {
        let client: Client = {
            id: this.client.id,
            title: this.clientForm.controls.title.value,
            code: this.clientForm.controls.code.value,
            edrpou: this.clientForm.controls.edrpou.value,
            vatCertificate: this.clientForm.controls.vatCertificate.value,
            inn: this.clientForm.controls.inn.value
        };
        let msg = 'Клиент ' + client.code + '(ID=' + client.id + ') ';
        this.clientService.updateClient(client).toPromise()
            .then(response => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно!',
                    detail: msg + 'успешно обновлен'
                });
                this.subscriptionService.setCurrentClient(response);
            })
            .then(() => this.goBackToClient());
    }

    goBackToClient() {
        this.clientService.goToUrl([this.client.url])
            .then(() => {
            });
    }

}
