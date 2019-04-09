import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "app/services/client.service";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {UtilService} from "app/services/util.service";
import {ClientAccount} from "app/models/ClientAccount";
import {Client} from "app/models/Client";

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
    loadingState: boolean;

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
        let accountId = +this.route.snapshot.params.id;
        if (accountId) {
            this.loadingState = true;
            this.clientService.getAccountById(accountId, this.getClient().id).toPromise()
                .then(account => {
                    this.account = account;
                    this.accountForm.controls.number.setValue(account.number);
                    this.accountForm.controls.bankName.setValue(account.bankName);
                    this.accountForm.controls.mfo.setValue(account.mfo);
                    this.accountForm.controls.dateStart.setValue(new Date(account.dateStart));
                    this.loadingState = false;
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
            number: ['', Validators.compose(
                [Validators.required,
                    Validators.minLength(1)]
            )],
            bankName: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1)
            ])],
            mfo: ['', Validators.compose([
                Validators.required,
                Validators.minLength(1)
            ])],
            dateStart: ['', Validators.compose([
                Validators.required,
            ])]
        });
    }

    getClient() {
        let client: Client = new Client();
        this.clientService.getCurrentClient().subscribe(data => client = data);
        return client;
    }

    private save() {
        let msg = 'Счет для ' + this.getClient().code;
        let account: ClientAccount = new ClientAccount();
        account.number = this.accountForm.controls.number.value;
        account.bankName = this.accountForm.controls.bankName.value;
        account.mfo = this.accountForm.controls.mfo.value;
        account.dateStart = this.accountForm.controls.dateStart.value;
        this.clientService.addAccount(account, this.getClient().id).toPromise()
            .then(response => {
                this.clientService.fetchAccountsByClientId(this.getClient().id).toPromise()
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
                        this.clientService.fetchAccountsByClientId(this.getClient().id).toPromise()
                            .then(() => {
                                this.goBackToAccounts();
                            })
                    })
            },
            reject: () => {
            }
        });
    }

    private update() {
        const account = {
            id: this.account.id,
            number: this.accountForm.controls.number.value,
            bankName: this.accountForm.controls.bankName.value,
            mfo: this.accountForm.controls.mfo.value,
            dateStart: this.accountForm.controls.dateStart.value
        };
        this.clientService.updateAccount(account, this.getClient().id).toPromise()
            .then(response => {
                let msg = 'Счет (ID=' + response.id + ') для клиента ' + this.getClient().code;
                this.clientService.fetchAccountsByClientId(this.getClient().id).toPromise()
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
            });
    }

}
