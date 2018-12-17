import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../../../../services/client.service';
import {UtilService} from '../../../../../services/util.service';
import {ClientAddress} from '../../../../../models/ClientAddress';
import {MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-add-address',
    templateUrl: './add-address.component.html',
    styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
    years: string;
    ru: any;
    addressForm: FormGroup;

    constructor(private clientService: ClientService,
                private formBuilder: FormBuilder,
                private messageService: MessageService) {
        this.ru = UtilService.getCalendarLocalSet();
        this.years = UtilService.getCalendarYears(5);
    }

    ngOnInit() {
        this.initAddressForm();
    }

    onSubmit() {
        this.save();
    }

    private initAddressForm() {
        this.addressForm = this.formBuilder.group({
            presentation: ['', Validators.compose([
                Validators.required
            ])],
            dateStart: ['', Validators.compose([
                Validators.required,
                Validators.nullValidator
            ])]
        });
    }

    getClient() {
        return this.clientService.getCurrentClient();
    }

    private save() {
        let msg = 'Адрес для ' + this.getClient().alias;
        let address: ClientAddress = new ClientAddress();
        address.presentation = this.addressForm.controls.presentation.value;
        address.dateStart = this.addressForm.controls.dateStart.value;
        this.clientService.addAddress(address, this.getClient().id).toPromise()
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
                        this.goBackToAddresses();
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

    private goBackToAddresses() {
        this.clientService.goToUrl([this.getClient().url, 'addresses'])
            .then(() => {
            });
    }

}
