import {Component, OnChanges, OnInit} from '@angular/core';
import { ClientAgreement } from '../../../models/ClientAgreement';
import { AgreementService } from '../../../services/agreement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agreement-details',
  templateUrl: './agreement-details.component.html',
  styleUrls: ['./agreement-details.component.css']
})
export class AgreementDetailsComponent implements OnInit, OnChanges {
    agreementId: number;
    agreement: ClientAgreement;

    constructor(private agreementService: AgreementService,
                private route: ActivatedRoute) {
        this.agreementId = +route.snapshot.params.id;
        agreementService.fetchAgreementById(this.agreementId);

    }

    ngOnInit() {
        this.agreementService.emitterAgreement
            .subscribe(
                agreement => this.agreement = agreement
            );
    }



    ngOnChanges() {
    }

}
