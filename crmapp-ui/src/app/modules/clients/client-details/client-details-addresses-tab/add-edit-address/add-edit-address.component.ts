import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {UtilService} from "app/services/util.service";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "app/services/client.service";
import {AddressService} from "app/services/address.service";
import {Address} from "app/models/Address";

@Component({
    selector: 'app-add-edit-address',
    templateUrl: './add-edit-address.component.html',
    styleUrls: ['./add-edit-address.component.css']
})
export class AddEditAddressComponent implements OnInit {
    address: Address = <Address>{};
    isNew: boolean = false;
    years: string;
    ru: any;
    addressForm: FormGroup;
    countries: any[];
    loadingState: boolean;

    constructor(private clientService: ClientService,
                private addressService: AddressService,
                private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
        this.initAddressForm();
        this.ru = UtilService.getCalendarLocalSet();
        this.years = UtilService.getCalendarYears(5);
        this.addressService.fetchCountries().toPromise()
            .then(response => {
                this.countries = response
            });
    }

    ngOnInit() {
        let addressId = +this.route.snapshot.params.id;
        if (addressId) {
            this.loadingState = true;
            this.clientService.getAddressById(addressId, this.getClient().id).toPromise()
                .then(address => {
                    this.address = address;
                    this.addressForm.controls.country.setValue(address.country);
                    this.addressForm.controls.region.setValue(address.region);
                    this.addressForm.controls.city.setValue(address.city);
                    this.addressForm.controls.street.setValue(address.street);
                    this.addressForm.controls.building.setValue(address.building);
                    this.addressForm.controls.apartment.setValue(address.apartment);
                    this.addressForm.controls.zip.setValue(address.zip);
                    this.addressForm.controls.dateStart.setValue(new Date(address.dateStart));
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

    private initAddressForm() {
        this.addressForm = this.formBuilder.group({
            country: ['', Validators.compose([
                Validators.required
            ])],
            region: ['', Validators.compose([
                Validators.maxLength(30)
            ])],
            city: ['', Validators.compose([
                Validators.maxLength(25)
            ])],
            street: ['', Validators.compose([
                Validators.maxLength(100)
            ])],
            building: ['', Validators.compose([
                Validators.maxLength(25)
            ])],
            apartment: ['', Validators.compose([
                Validators.maxLength(15)
            ])],
            zip: ['', Validators.compose([
                Validators.maxLength(5)
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
        let msg = 'Адрес для ' + this.getClient().alias;
        let address = <Address>{};
        address.country = this.addressForm.controls.country.value;
        address.region = this.addressForm.controls.region.value;
        address.city = this.addressForm.controls.city.value;
        address.street = this.addressForm.controls.street.value;
        address.building = this.addressForm.controls.building.value;
        address.apartment = this.addressForm.controls.apartment.value;
        address.zip = this.addressForm.controls.zip.value;
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
            },
            reject: () => {
            }
        });
    }

    private update() {
        const address = <Address>{
            id: this.address.id,
            country: this.addressForm.controls.country.value,
            region: this.addressForm.controls.region.value,
            city: this.addressForm.controls.city.value,
            street: this.addressForm.controls.street.value,
            building: this.addressForm.controls.building.value,
            apartment: this.addressForm.controls.apartment.value,
            zip: this.addressForm.controls.zip.value,
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
            });
    }

}
