import {Component, OnInit} from '@angular/core';
import {Message, ConfirmationService} from 'primeng/api';
import {AgreementService} from '../../../../services/agreement.service';
import {Router} from '@angular/router';
import {ClientAgreement} from '../../../../models/ClientAgreement';
import {ClientService} from '../../../../services/client.service';

@Component({
    selector: 'app-agreement-details-main-tab',
    templateUrl: './agreement-details-main-tab.component.html',
    styleUrls: ['./agreement-details-main-tab.component.css']
})
export class AgreementDetailsMainTabComponent implements OnInit {
    msgs: Message[] = [];

    constructor(private agreementService: AgreementService,
                private clientService: ClientService,
                private router: Router,
                private confirmationService: ConfirmationService) {
    }

    ngOnInit() {}

    getAgreement() {
        return this.agreementService.getAgreement();
    }

    confirmDeleting() {
        let msg = 'Договор \"' + this.getAgreement().number + '(ID=' + this.getAgreement().id + ')\" успешно удален';
        this.confirmationService.confirm({
            message: 'Действительно удалить договор?',
            header: 'Удаление объекта',
            icon: 'fa fa-trash',
            accept: () => {
                this.delete();
                this.msgs = [{severity: 'success', summary: 'Успешно', detail: msg}];
            },
            reject: () => {
            }
        });
    }

    private getClientById(clientId: number) {
        this.clientService.getClientById(clientId)
            .subscribe(
                client => this.getAgreement().client = client
            );
    }

    private delete(): void {
        this.agreementService.deleteAgreement(this.getAgreement())
            .subscribe(
                () => this.goBackToAgreements()
            );
    }

    private goBackToAgreements(): void {
        setTimeout(
            () => {
                this.router.navigate(['/agreements']);
            }, 1500);
    }

}
