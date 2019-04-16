import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ClientService} from 'app/services/client.service';
import {Client} from 'app/models/Client';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html',
    styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
    tabs: MenuItem[];
    clientForm: FormGroup;

    constructor(private clientService: ClientService,
                private formBuilder: FormBuilder,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.initUserForm();
        this.initTabs();
    }

    onSubmit() {
        this.save();
    }

    private initUserForm() {
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

}
