import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../../../../services/client.service";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {UtilService} from "../../../../../services/util.service";
import {ClientAccount} from "../../../../../models/ClientAccount";

@Component({
  selector: 'app-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.css']
})
export class AddEditAccountComponent implements OnInit {
    account: ClientAccount;
    isNew: boolean = false;
    years: string;
    ru: any;
    accountForm: FormGroup;

    constructor(private clientService: ClientService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
        this.initAccountForm();
        this.ru = UtilService.getCalendarLocalSet();
        this.years = UtilService.getCalendarYears(5);
    }

    ngOnInit() {
        let addressId = +this.route.snapshot.params.id;
        if (addressId) {
            this.clientService.getAddressById(addressId, this.getClient().id).toPromise()
                .then(address => {
                    this.account = address;
                    this.accountForm.controls.presentation.setValue(address.presentation);
                    this.accountForm.controls.dateStart.setValue(new Date(address.dateStart));
                });
        } else {
            this.isNew = true;
        }
    }

    onSubmit() {
        if (this.isNew) {
            this.save();
        } else {
            this.update();
        }
    }

    private initAccountForm() {
        this.accountForm = this.formBuilder.group({
            presentation: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1)
            ])],
            dateStart: ['', Validators.compose([
                Validators.required,
            ])]
        });
    }

    getClient() {
        return this.clientService.getCurrentClient();
    }

    private save() {
        let msg = 'Счет для ' + this.getClient().alias;
        let account: ClientAccount = new ClientAccount();
        account.presentation = this.accountForm.controls.presentation.value;
        account.dateStart = this.accountForm.controls.dateStart.value;
        this.clientService.addAccount(account, this.getClient().id).toPromise()
            .then(response => {
                this.clientService.fetchAllClientDataPromise(this.getClient().id)
                    .then(() => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: msg + ' успешно добавлен (ID=' + response.id + ')'
                        });
                    })
                    .then(() => {
                        this.goBackToAccounts();
                    });
            })
            .catch(() => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Ошибка!',
                    detail: msg + ' не добавлен'
                });
            });
    }

    private goBackToAccounts() {
        this.clientService.goToUrl([this.getClient().url, 'accounts'])
            .then(() => {
            });
    }

    confirmDeleting() {
        this.confirmationService.confirm({
            message: 'Действительно удалить счет?',
            header: 'Удаление',
            icon: 'fa fa-trash',
            accept: () => {
                let msg = 'Счет (ID=' + this.account.id + ')';
                this.clientService.deleteAccount(this.account.id, this.getClient().id).toPromise()
                    .then(() => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: msg + ' успешно удален'
                        });
                    })
                    .then(() => {
                        this.clientService.fetchAllClientDataPromise(this.getClient().id)
                            .then(() => {
                                this.goBackToAccounts();
                            })
                    })
                    .catch(() => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Ошибка!',
                            detail: msg + ' не удален'
                        });
                    });
            },
            reject: () => {
            }
        });
    }

    private update() {
        const account = {
            id: this.account.id,
            presentation: this.accountForm.controls.presentation.value,
            dateStart: this.accountForm.controls.dateStart.value
        };
        this.clientService.updateAccount(account, this.getClient().id).toPromise()
            .then(response => {
                let msg = 'Счет (ID=' + response.id + ') для клиента ' + this.getClient().alias;
                this.clientService.fetchAllClientDataPromise(this.getClient().id)
                    .then(() => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: msg + ' успешно обновлен'
                        });
                    })
                    .then(() => {
                        this.goBackToAccounts();
                    })
                    .catch(() => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Ошибка!',
                            detail: msg + ' не обновлен'
                        });
                    })
            });
    }

}
