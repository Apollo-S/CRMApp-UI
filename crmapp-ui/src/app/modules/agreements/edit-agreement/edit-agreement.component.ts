import {Component, OnInit, OnDestroy} from '@angular/core';
import {ClientAgreement} from 'app/models/ClientAgreement';
import {Message} from 'primeng/api';
import {Subscription} from 'rxjs';
import {AgreementService} from 'app/services/agreement.service';
import {Router} from '@angular/router';
import {ClientService} from 'app/services/client.service';
import {UtilService} from 'app/services/util.service';
import {Client} from 'app/models/Client';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-edit-agreement',
    templateUrl: './edit-agreement.component.html',
    styleUrls: ['./edit-agreement.component.css']
})
export class EditAgreementComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    agreement: ClientAgreement = new ClientAgreement();
    agreementForm: FormGroup;
    clients: Client[] = [];
    years: string;
    ru: any;

    constructor(private clientService: ClientService,
                private agreementService: AgreementService,
                private formBuilder: FormBuilder) {
        this.initCalendarSettings();
        this.getClients();
    }

    ngOnInit() {
        this.subscription = this.agreementService.getCurrentAgreement()
            .subscribe(agreement => {
                this.agreement = agreement;
                this.initForm();
            });
    }

    onSubmit() {
        this.update();
        this.goBackToAgreement(1500);
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
        this.agreementForm.controls.number.setValue(this.agreement.number);
        this.agreementForm.controls.client.setValue(this.agreement.clientInfo);
        this.agreementForm.controls.dateStart.setValue(new Date(this.agreement.dateStart));
        this.agreementForm.controls.comment.setValue(this.agreement.comment);
    }

    private getClients() {
        this.clientService.fetchClients().subscribe(
            clients => this.clients = clients
        );
    }

    private initCalendarSettings() {
        this.ru = UtilService.getCalendarLocalSet();
        this.years = UtilService.getCalendarYears(5);
    }

    private update(): void {
        this.agreementService.updateAgreement(this.agreement).toPromise()
            .then(response => {
                    this.agreement = response;
                    let msg = 'Договор №' + this.agreement.number + ' успешно изменен (ID=' + response.id + ')';
                    // this.msgs = [{severity: 'success', summary: 'Успешно!', detail: msg}];
                }
            );
    }

    private goBackToAgreement(timeMillis: number) {
        // setTimeout(
        //     (router) => {
        //         this.router.navigate([this.agreement.url]);
        //     }, timeMillis);
    }

}
