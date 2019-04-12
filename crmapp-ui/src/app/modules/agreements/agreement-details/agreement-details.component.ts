import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientAgreement} from 'app/models/ClientAgreement';
import {AgreementService} from 'app/services/agreement.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
    selector: 'app-agreement-details',
    templateUrl: './agreement-details.component.html',
    styleUrls: ['./agreement-details.component.css']
})
export class AgreementDetailsComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    agreementId: number;
    agreement: ClientAgreement;
    loadingState: boolean;

    constructor(private agreementService: AgreementService,
                private route: ActivatedRoute) {
        this.agreementId = +route.snapshot.params.id;

    }

    ngOnInit() {
        this.loadingState = true;
        this.getAgreement().then(() => {
            this.loadingState = false;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    getAgreement() {
        return this.agreementService.fetchAgreementById(this.agreementId).toPromise()
            .then(data => {
                    this.agreementService.setCurrentAgreement(data);
                    this.subscription = this.agreementService.getCurrentAgreement()
                        .subscribe(agreement => this.agreement = agreement);
                }
            );
    }

}
