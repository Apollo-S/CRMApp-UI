import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from 'app/services/client.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Client} from "app/models/Client";
import {Subscription} from "rxjs";
import {SubscriptionService} from "../../../../services/subscription.service";

@Component({
    selector: 'app-client-details-main-tab',
    templateUrl: './client-details-main-tab.component.html',
    styleUrls: ['./client-details-main-tab.component.css'],
    providers: [ClientService]
})
export class ClientDetailsMainTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    client: Client = {};
    loadingState: boolean;

    constructor(private clientService: ClientService,
                private subscriptionService: SubscriptionService,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
        this.loadingState = true;
    }

    ngOnInit() {
        try {
            this.subscription = this.subscriptionService.getCurrentClient()
                .subscribe(client => {
                    this.client = client;
                    this.loadingState = false;
                });
        } catch (e) {
            console.log(e);
        } finally {
            this.loadingState = false;
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    confirmDeleting() {
        let msg = 'Клиент \"' + this.client.title + '\" (ID=' + this.client.id + ') ';
        this.confirmationService.confirm({
            message: 'Действительно удалить ' + this.client.title + ' ?',
            header: 'Удаление',
            icon: 'fa fa-trash',
            accept: () => {
                this.clientService.deleteClient(this.client.id).toPromise()
                    .then(
                    () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: (msg + ' успешно удален')
                        });
                        this.router.navigate(['/clients']);
                    })
            },
            reject: () => {}
        });
    }

}
