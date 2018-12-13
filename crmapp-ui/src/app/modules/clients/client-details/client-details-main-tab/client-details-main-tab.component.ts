import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ClientService} from '../../../../services/client.service';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
    selector: 'app-client-details-main-tab',
    templateUrl: './client-details-main-tab.component.html',
    styleUrls: ['./client-details-main-tab.component.css']
})
export class ClientDetailsMainTabComponent implements OnInit {

    constructor(private clientService: ClientService,
                private router: Router,
                private confirmationService: ConfirmationService,
                private messageService: MessageService) {
    }

    ngOnInit() {}

    getCurrentClient() {
        return this.clientService.getCurrentClient();
    }

    confirmDeleting() {
        let msg = 'Клиент \"' + this.getCurrentClient().title + '\" (ID=' + this.getCurrentClient().id + ') ';
        this.confirmationService.confirm({
            message: 'Действительно удалить ' + this.getCurrentClient().title + ' ?',
            header: 'Удаление',
            icon: 'fa fa-trash',
            accept: () => {
                this.clientService.deleteClient(this.getCurrentClient().id).toPromise()
                    .then(
                    () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Успешно!',
                            detail: (msg + ' успешно удален')
                        });
                        this.router.navigate(['/clients']);
                    })
                    .catch(
                    () => {
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Ошибка!',
                            detail: (msg + ' не удален')
                        });
                    });
            },
            reject: () => {}
        });
    }

}
