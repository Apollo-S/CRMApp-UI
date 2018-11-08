import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
    clientId: number;
    client: Client = {};

    constructor(private clientService: ClientService,
                private route: ActivatedRoute) {
        this.clientId = +route.snapshot.params.id;
        clientService.fetchClientById(this.clientId);
        clientService.emitterClient.subscribe(
            client => {
                this.client = client;
                clientService.getAccountsByClientId(client.id);
            }
        );

    }

    ngOnInit() {}

}
