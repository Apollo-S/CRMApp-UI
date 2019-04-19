import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ClientAgreement} from "app/models/ClientAgreement";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Client} from "app/models/Client";
import {ClientService} from "app/services/client.service";
import {AgreementService} from "app/services/agreement.service";
import {UtilService} from "app/services/util.service";
import {MenuItem} from "primeng/api";
import {AppConst} from "app/app-const";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-add-edit-agreement',
    templateUrl: './add-edit-agreement.component.html',
    styleUrls: ['./add-edit-agreement.component.css']
})
export class AddEditAgreementComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    isNew: boolean = false;
    agreement: ClientAgreement = new ClientAgreement();
    tabs: MenuItem[];
    agreementForm: FormGroup;
    clients: Client[] = [];
    loadingState: boolean;
    years: string;
    ru: any;

    constructor(private clientService: ClientService,
                private agreementService: AgreementService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute) {
        this.initCalendarSettings();
        this.initForm();

    }

    ngOnInit() {
        this.isNew = (this.route.routeConfig.path === AppConst.ADD_AGREEMENT_URL);
        this.loadingState = true;
        this.fetchClients().then(() => {
            if (!this.isNew) {
                this.subscription = this.agreementService.getCurrentAgreement()
                    .subscribe(agreement => {
                        this.agreement = agreement;
                        this.agreementForm.controls.number.setValue(this.agreement.number);
                        this.agreementForm.controls.client.setValue(this.agreement.clientInfo);
                        this.agreementForm.controls.dateStart.setValue(new Date(this.agreement.dateStart));
                        this.agreementForm.controls.comment.setValue(this.agreement.comment);
                        this.loadingState = false;
                    });
            } else {
                this.initDisabledTabs();
                this.agreementForm.controls.client.setValue(this.clientService.getCurrentClient());
                this.agreementForm.controls.dateStart.setValue(new Date());
                this.loadingState = false;
            }
        });
    }

    onSubmit() {
        if (this.isNew) {
            this.save();
        } else {
            this.update();
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private initForm() {
        this.agreementForm = this.formBuilder.group({
            number: new FormControl('', Validators.compose([
                Validators.required,
                Validators.minLength(2)
            ])),
            client: new FormControl('', Validators.compose([
                Validators.required
            ])),
            dateStart: new FormControl('', Validators.compose([
                Validators.required,
            ])),
            comment: new FormControl('')
        });
    }

    private fetchClients() {
        return this.clientService.fetchClients().toPromise()
            .then(clients => this.clients = clients);
    }

    private initCalendarSettings() {
        this.ru = UtilService.getCalendarLocalSet();
        this.years = UtilService.getCalendarYears(5);
    }

    private initDisabledTabs() {
        this.tabs = [
            {label: 'Основные данные', icon: 'fa fa-address-card-o', disabled: true},
            {label: 'Связанные документы', icon: 'fa fa-file-text-o', disabled: true}
        ];
    }

    private save() {
        this.agreementService.addAgreement(this.agreement)
            .subscribe(
                response => {
                    this.agreement = response;
                    let msg = 'Договор №' + this.agreement.number + ' успешно добавлен (ID=' + response.id + ')';
                    // this.msgs = [{severity:'success', summary:'Успешно!', detail: msg}];
                }
            );
    }

    private update() {
        this.agreementService.updateAgreement(this.agreement).toPromise()
            .then(response => {
                    this.agreement = response;
                    let msg = 'Договор №' + this.agreement.number + ' успешно изменен (ID=' + response.id + ')';
                    // this.msgs = [{severity: 'success', summary: 'Успешно!', detail: msg}];
                }
            );
    }

    private goBackToAgreement() {
        this.agreementService.goToUrl([this.agreement.url]);
    }

}
