import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AgreementService} from 'app/services/agreement.service';
import {ClientAgreement} from 'app/models/ClientAgreement';
import {ClientService} from 'app/services/client.service';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-agreement-details-main-tab',
    templateUrl: './agreement-details-main-tab.component.html',
    styleUrls: ['./agreement-details-main-tab.component.css'],
    providers: [ClientService]
})
export class AgreementDetailsMainTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    agreement: ClientAgreement = {};
    loadingState: boolean;

    constructor(private agreementService: AgreementService,
                private clientService: ClientService,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    ngOnInit() {
        this.getCurrentAgreement();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    private getCurrentAgreement() {
        this.loadingState = true;
        this.subscription = this.agreementService.getCurrentAgreement()
            .subscribe(agreement => {
                this.agreement = agreement;
                this.loadingState = false;
            });
    }

    confirmDeleting() {
        let msg = 'Договор \"' + this.agreement.number + '(ID=' + this.agreement.id + ')\" успешно удален';
        this.confirmationService.confirm({
            message: 'Действительно удалить договор № ' + this.agreement.number + '?',
            header: 'Удаление объекта',
            icon: 'fa fa-trash',
            accept: () => {
                this.agreementService.deleteAgreement(this.agreement.id).toPromise()
                    .then(
                        () => {
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Успешно!',
                                detail: (msg + ' успешно удален')
                            });
                            this.agreementService.goToUrl(['/agreements']);
                        })
            },
            reject: () => {
            }
        });
    }

}
