import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientService} from '../../../services/client.service';
import {Client} from '../../../models/Client';

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

    clientId: number;
    client: Client = {};
    loadingState: boolean = true;

    constructor(private clientService: ClientService,
                private route: ActivatedRoute) {
        this.clientId = +route.snapshot.params.id;
        this.clientService.fetchClientData(this.clientId);
    }

    ngOnInit() {
        this.clientService.emitterClient.subscribe((data) => {
            this.client = data;
            this.loadingState = false;
        });
    }



}
