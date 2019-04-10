import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ClientService} from '../../../services/client.service';
import {Client} from '../../../models/Client';
import {MessageService} from 'primeng/api';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-edit-client',
    templateUrl: './edit-client.component.html',
    styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    client: Client = {};
    clientForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private clientService: ClientService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.subscription = this.clientService.getCurrentClient()
            .subscribe(client => {
                this.client = client;
                this.initForm();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        this.update();
    }

    private initForm() {
        this.clientForm = this.formBuilder.group({
            title: [this.client.title, Validators.compose([
                Validators.required,
                Validators.minLength(2)
            ]),],
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
        this.clientForm.controls.title.setValue(this.client.title);
        this.clientForm.controls.code.setValue(this.client.code);
        this.clientForm.controls.edrpou.setValue(this.client.edrpou);
        this.clientForm.controls.vatCertificate.setValue(this.client.vatCertificate);
        this.clientForm.controls.inn.setValue(this.client.inn);
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
                this.clientService.setCurrentClient(response);
            })
            .then(() => this.goBackToClient());
    }

    private goBackToClient() {
        this.clientService.goToUrl([this.client.url])
            .then(() => {
            });
    }

}
