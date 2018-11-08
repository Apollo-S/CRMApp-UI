import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../../../models/Client';
import { ClientService } from '../../../../services/client.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-client-details-main-tab',
  templateUrl: './client-details-main-tab.component.html',
  styleUrls: ['./client-details-main-tab.component.css']
})
export class ClientDetailsMainTabComponent implements OnInit {
  msgs: Message[] = [];
  client: Client = {};

  constructor(private clientService: ClientService,
              private router: Router,
              private confirmationService: ConfirmationService) {}

  ngOnInit() {}

  getCurrentClient() {
      return this.clientService.getCurrentClient();
  }

  confirmDeleting() {
    let msg  = 'Клиент \"' + this.client.title + '(ID=' + this.client.id + ')\" успешно удален';
    this.confirmationService.confirm({
      message: 'Действительно удалить клиента?',
      header: 'Удаление объекта',
      icon: 'fa fa-trash',
      accept: () => {
        this.delete();
        this.msgs = [{severity:'success', summary:'Успешно', detail: msg}];
      },
      reject: () => {}
    });
  }

  private delete(): void {
    this.clientService.deleteClient(this.client)
      .subscribe(
        () => this.goBackToClients()
      );
  }

  private goBackToClients(): void {
    setTimeout(
      () => {
        this.router.navigate(['/clients']);
      }, 1500);
  }

}