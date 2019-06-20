import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {UtilService} from "app/services/util.service";
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "app/services/client.service";
import {Client} from "app/models/Client";
import {ClientAddress} from "app/models/ClientAddress";
import {CountryService} from "app/services/country.service";
import {ClientAddressService} from "app/services/client-address.service";
import {Country} from "app/models/Country";

@Component({
    selector: 'app-add-edit-address',
    templateUrl: './add-edit-address.component.html',
    styleUrls: ['./add-edit-address.component.css'],
    providers: [CountryService, ClientAddressService]
})
export class AddEditAddressComponent implements OnInit {
    address: ClientAddress = new ClientAddress();
    isNew: boolean = false;
    years: string;
    ru: any;
    addressForm: FormGroup;
    countries: Country[] = [];
    loadingState: boolean;

    constructor(private clientService: ClientService,
                private addressService: ClientAddressService,
                private countryService: CountryService,
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
        this.loadingState = true;
        this.countryService.fetchAllCountries().toPromise()
            .then(response => {
                this.countries = response;
                if (addressId) {
                    this.addressService.fetchAddressBy(addressId, this.getClient().id).toPromise()
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
                    this.loadingState = false;
                }
            });
    }

    onSubmit() {
        let address = new ClientAddress();
        address.client = this.getClient();
        address.country = this.addressForm.controls.country.value;
        address.region = this.addressForm.controls.region.value;
        address.city = this.addressForm.controls.city.value;
        address.street = this.addressForm.controls.street.value;
        address.building = this.addressForm.controls.building.value;
        address.apartment = this.addressForm.controls.apartment.value;
        address.zip = this.addressForm.controls.zip.value;
        address.dateStart = this.addressForm.controls.dateStart.value;
        if (this.isNew) {
            this.save(address);
        } else {
            address.id = this.address.id;
            this.update(address);
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
        let client: Client = new Client();
        this.clientService.getCurrentClient().subscribe(data => client = data);
        return client;
    }

    private save(address: ClientAddress) {
        let msg = 'Адрес для ' + this.getClient().code;
        this.addressService.addAddress(address, this.getClient().id).toPromise()
            .then(response => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно!',
                    detail: msg + ' успешно добавлен (ID=' + response.id + ')'
                });
            })
            .then(() => this.goBackToAddresses());
    }

    private goBackToAddresses() {
        this.addressService.goToUrl([this.getClient().url, 'addresses']);
    }

    confirmDeleting() {
        this.confirmationService.confirm({
            message: 'Действительно удалить адрес?',
            header: 'Удаление',
            icon: 'fa fa-trash',
            accept: () => {
                let msg = 'Адрес (ID=' + this.address.id + ')';
                this.addressService.deleteAddress(this.address.id, this.getClient().id).toPromise()
                    .then(() => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: msg + ' успешно удален'
                        });
                    })
                    .then(() => {
                        this.goBackToAddresses();
                    })
            },
            reject: () => {
            }
        });
    }

    private update(address: ClientAddress) {
        this.addressService.updateAddress(address, this.getClient().id).toPromise()
            .then(response => {
                let msg = 'Адрес (ID=' + response.id + ') для клиента ' + this.getClient().code;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Успешно!',
                    detail: msg + ' успешно обновлен'
                });
            })
            .then(() => this.goBackToAddresses());
    }

}
