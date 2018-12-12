import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {ClientService} from '../../../services/client.service';
import {Client} from '../../../models/Client';
import {MenuItem, MessageService} from 'primeng/api';

@Component({
    selector: 'app-add-client',
    templateUrl: './add-client.component.html',
    styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
    tabs: MenuItem[];
    userform: FormGroup;

    constructor(private clientService: ClientService,
                private formBuilder: FormBuilder,
                private router: Router,
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
        this.userform = this.formBuilder.group({
            title: ['', Validators.compose([
                Validators.required,
                Validators.minLength(2)
            ])],
            alias: ['', Validators.compose([
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
                Validators.maxLength(14)
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
            title: this.userform.controls.title.value,
            alias: this.userform.controls.alias.value,
            edrpou: this.userform.controls.edrpou.value,
            vatCertificate: this.userform.controls.vatCertificate.value,
            inn: this.userform.controls.inn.value
        };
        this.clientService.addClient(client).toPromise()
            .then(
                response => {
                    let msg = 'Клиент ' + response.alias + ' успешно добавлен (ID=' + response.id + ')';
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Успешно!',
                        detail: msg
                    });
                    this.router.navigate([response.url]);
                })
            .catch(
                () => {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Ошибка!',
                        detail: 'Клиент не добавлен'
                    });
                }
            );
    }

}
