import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ClientService} from '../../../../../services/client.service';
import {UtilService} from '../../../../../services/util.service';
import {ConfirmationService, Message} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-edit-address',
    templateUrl: './edit-address.component.html',
    styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
    msgs: Message[] = [];
    address: any;
    years: string;
    ru: any;
    addressForm: FormGroup;
    addressId: number;

    constructor(private clientService: ClientService,
                private formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService) {
        this.addressId = +route.snapshot.params.id;
        this.addressForm = this.formBuilder.group({
            presentation: ['', Validators.required],
            dateStart: ['', Validators.required]
        });
        this.getClientAddressById(this.addressId, this.getClient().id).toPromise().then(
            address => {
                address.dateStart = new Date(address.dateStart);
                this.addressForm.controls.presentation.setValue(address.presentation);
                this.addressForm.controls.dateStart.setValue(address.dateStart);
            }
        );
    }

    ngOnInit() {
        this.ru = UtilService.getCalendarLocalSet();
        this.years = UtilService.getCalendarYears(5);
    }

    onSubmit() {
        this.update().then(
            () => {
                this.goBackToAddresses()
            });
    }

    getClient() {
        return this.clientService.getCurrentClient();
    }

    confirmDeleting() {
        this.confirmationService.confirm({
            message: 'Действительно удалить адрес?',
            header: 'Удаление адреса',
            icon: 'fa fa-trash',
            accept: () => {
                let msg = 'Адрес успешно удален (ID=' + this.address.id + ')';
                this.delete().toPromise().then(
                    () => {
                        this.msgs = [{severity: 'success', summary: 'Успешно', detail: msg}];
                    }
                ).then(
                    () => { this.goBackToAddresses(); }
                );
            },
            reject: () => {
            }
        });
    }

    private delete() {
        return this.clientService.deleteAddress(this.address.id, this.getClient());
    }

    private update() {
        debugger
        let address = {
            id: this.addressId,
            presentation: this.addressForm.controls.presentation.value,
            dateStart: this.addressForm.controls.dateStart.value
        };
        return this.clientService.updateAddress(address, this.getClient().id).toPromise().then(
            response => {
                this.clientService.fetchAddressesByClientId(this.getClient().id).toPromise().then(
                    () => {
                        let msg = 'Адрес для ' + this.getClient().alias + ' успешно обновлен (ID=' + response.id + ')';
                        this.msgs = [{severity: 'success', summary: 'Успешно', detail: msg}];
                        this.goBackToAddresses();

                    }
                )
            }
        );
    }

    getClientAddressById(addressId: number, clientId: number) {
        return this.clientService.getAddressById(addressId, clientId);
    }

    goBackToAddresses() {
        this.router.navigate([this.getClient().url, 'addresses']).then(() => {});
    }

}
