import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientService} from '../../../../../services/client.service';
import {UtilService} from '../../../../../services/util.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-edit-address',
    templateUrl: './edit-address.component.html',
    styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
    address: any;
    years: string;
    ru: any;
    addressForm: FormGroup;
    addressId: number;

    constructor(private clientService: ClientService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
        this.addressId = +route.snapshot.params.id;
        this.ru = UtilService.getCalendarLocalSet();
        this.years = UtilService.getCalendarYears(5);
    }

    ngOnInit() {
        this.addressForm = this.formBuilder.group({
            presentation: ['', Validators.required],
            dateStart: ['', Validators.required]
        });
        this.clientService.getAddressById(this.addressId, this.getClient().id).toPromise()
            .then(address => {
                this.address = address;
                this.addressForm.controls.presentation.setValue(address.presentation);
                this.addressForm.controls.dateStart.setValue(new Date(address.dateStart));
            });
    }

    onSubmit() {
        this.update();
    }

    getClient() {
        return this.clientService.getCurrentClient();
    }

    confirmDeleting() {
        this.confirmationService.confirm({
            message: 'Действительно удалить адрес?',
            header: 'Удаление',
            icon: 'fa fa-trash',
            accept: () => {
                let msg = 'Адрес (ID=' + this.address.id + ')';
                this.clientService.deleteAddress(this.address.id, this.getClient()).toPromise()
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
            id: this.addressId,
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

    goBackToAddresses() {
        this.clientService.goToUrl([this.getClient().url, 'addresses']).then(() => {});
    }

}
