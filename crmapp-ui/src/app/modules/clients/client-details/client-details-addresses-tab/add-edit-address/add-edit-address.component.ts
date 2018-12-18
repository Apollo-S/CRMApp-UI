import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../../../../services/client.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {UtilService} from "../../../../../services/util.service";
import {ClientAddress} from "../../../../../models/ClientAddress";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-add-edit-address',
    templateUrl: './add-edit-address.component.html',
    styleUrls: ['./add-edit-address.component.css']
})
export class AddEditAddressComponent implements OnInit {
    // addressId: number;
    address: ClientAddress;
    isNew: boolean = false;
    years: string;
    ru: any;
    addressForm: FormGroup;

    constructor(private clientService: ClientService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
        this.initAddressForm();
        this.ru = UtilService.getCalendarLocalSet();
        this.years = UtilService.getCalendarYears(5);
    }

    ngOnInit() {
        let addressId = +this.route.snapshot.params.id;
        if (addressId) {
            this.clientService.getAddressById(addressId, this.getClient().id).toPromise()
                .then(address => {
                    this.address = address;
                    this.addressForm.controls.presentation.setValue(address.presentation);
                    this.addressForm.controls.dateStart.setValue(new Date(address.dateStart));
                });
        } else {
            this.isNew = true;
        }
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

    confirmDeleting() {
        this.confirmationService.confirm({
            message: 'Действительно удалить адрес?',
            header: 'Удаление',
            icon: 'fa fa-trash',
            accept: () => {
                let msg = 'Адрес (ID=' + this.address.id + ')';
                this.clientService.deleteAddress(this.address.id, this.getClient().id).toPromise()
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
                                this.goBackToAddresses();
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
            reject: () => {}
        });
    }

    private update() {
        const address = {
            id: this.address.id,
            presentation: this.addressForm.controls.presentation.value,
            dateStart: this.addressForm.controls.dateStart.value
        };
        this.clientService.updateAddress(address, this.getClient().id).toPromise()
            .then(response => {
                let msg = 'Адрес (ID=' + response.id + ') для клиента ' + this.getClient().alias;
                this.clientService.fetchAllClientDataPromise(this.getClient().id)
                    .then(() => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: msg + ' успешно обновлен'
                        });
                    })
                    .then(() => {
                        this.goBackToAddresses();
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
