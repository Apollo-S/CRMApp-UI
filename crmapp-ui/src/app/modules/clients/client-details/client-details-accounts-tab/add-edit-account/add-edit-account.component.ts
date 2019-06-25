import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {UtilService} from "app/services/util.service";
import {ClientAccount} from "app/models/ClientAccount";
import {Client} from "app/models/Client";
import {CurrencyType} from "app/models/CurrencyType";
import {Bank} from "app/models/Bank";
import {CurrencyTypeService} from "app/services/currency-type.service";
import {BankService} from "app/services/bank.service";
import {ClientAccountService} from "app/services/client-account.service";
import {SubscriptionService} from "app/services/subscription.service";

@Component({
    selector: 'app-add-edit-account',
    templateUrl: './add-edit-account.component.html',
    styleUrls: ['./add-edit-account.component.css'],
    providers: [ClientAccountService, BankService, CurrencyTypeService]
})
export class AddEditAccountComponent implements OnInit {
    account: ClientAccount;
    isNew: boolean = false;
    years: string;
    ru: any;
    accountForm: FormGroup;
    loadingState: boolean;
    currencyTypes: CurrencyType[] = [];
    banks: Bank[] = [];

    constructor(private subscriptionService: SubscriptionService,
                private accountService: ClientAccountService,
                private curTypeService: CurrencyTypeService,
                private bankService: BankService,
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
        this.loadingState = true;

        this.fetchBankData().then(() => {
            if (accountId) {
                this.accountService.fetchAccountBy(accountId, this.getClient().id).toPromise()
                    .then(account => {
                        this.account = account;
                        this.accountForm.controls.number.setValue(account.number);
                        this.accountForm.controls.bank.setValue(account.bank);
                        this.accountForm.controls.currencyType.setValue(account.currencyType);
                        this.accountForm.controls.dateStart.setValue(new Date(account.dateStart));
                        this.loadingState = false;
                    });
            } else {
                this.isNew = true;
                this.loadingState = false;
            }
        });
    }

    async fetchBankData() {
        let banksPromise = this.bankService.fetchBanks().toPromise();
        let currencyTypesPromise = this.curTypeService.fetchCurrencyTypes().toPromise();
        this.banks = await banksPromise;
        this.currencyTypes = await currencyTypesPromise;
    }

    onSubmit() {
        let account: ClientAccount = new ClientAccount();
        account.client = this.getClient();
        account.number = this.accountForm.controls.number.value;
        account.bank = this.accountForm.controls.bank.value;
        account.currencyType = this.accountForm.controls.currencyType.value;
        account.dateStart = this.accountForm.controls.dateStart.value;
        if (this.isNew) {
            this.save(account);
        } else {
            account.id = this.account.id;
            this.update(account);
        }
    }

    private initAccountForm() {
        this.accountForm = this.formBuilder.group({
            number: ['', Validators.compose(
                [Validators.required,
                    Validators.minLength(1)]
            )],
            bank: ['', Validators.compose([
                Validators.required,
            ])],
            currencyType: ['', Validators.compose([
                Validators.required
            ])],
            dateStart: ['', Validators.compose([
                Validators.required,
            ])]
        });
    }

    getClient() {
        let client: Client = new Client();
        this.subscriptionService.getCurrentClient().subscribe(data => client = data);
        return client;
    }

    private save(account: ClientAccount) {
        let msg = 'Счет для ' + this.getClient().code;
        this.accountService.addAccount(account, this.getClient().id).toPromise()
            .then(response => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно!',
                    detail: msg + ' успешно добавлен (ID=' + response.id + ')'
                });
            })
            .then(() => this.goBackToAccounts());
    }

    private goBackToAccounts() {
        this.accountService.goToUrl([this.getClient().url, 'accounts']);
    }

    confirmDeleting() {
        this.confirmationService.confirm({
            message: 'Действительно удалить счет?',
            header: 'Удаление',
            icon: 'fa fa-trash',
            accept: () => {
                let msg = 'Счет (ID=' + this.account.id + ')';
                this.accountService.deleteAccount(this.account.id, this.getClient().id).toPromise()
                    .then(() => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: msg + ' успешно удален'
                        });
                    })
                    .then(() => this.goBackToAccounts())
            },
            reject: () => {
            }
        });
    }

    private update(account: ClientAccount) {
        this.accountService.updateAccount(account, this.getClient().id).toPromise()
            .then(response => {
                let msg = 'Счет (ID=' + response.id + ') для клиента ' + this.getClient().code;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно!',
                    detail: msg + ' успешно обновлен'
                });
            })
            .then(() => this.goBackToAccounts())
    }

}
