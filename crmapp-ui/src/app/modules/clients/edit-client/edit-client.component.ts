import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/Client';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  msgs: Message[] = [];
  userform: FormGroup;
  client: Client = {};

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private router: Router) {
      // this.getClient();
  }

  ngOnInit() {
      this.userform = this.formBuilder.group({
          title: [this.getClient().title, Validators.compose([
              Validators.required,
              Validators.minLength(2)
          ]), ],
          alias: ['', Validators.compose([
              Validators.required,
              Validators.minLength(2)
          ])],
          edrpou: ['', Validators.compose([
              Validators.required,
              Validators.minLength(6),
              Validators.maxLength(14)
          ])],
          inn: ['', Validators.compose([
              Validators.maxLength(14)
          ])],
          vatCertificate: ['', Validators.compose([
              Validators.maxLength(14)
          ])]
      });
      this.userform.controls['title'].setValue(this.getClient().title);
      this.userform.controls['alias'].setValue(this.getClient().alias);
      this.userform.controls['edrpou'].setValue(this.getClient().edrpou);
      this.userform.controls['vatCertificate'].setValue(this.getClient().vatCertificate);
      this.userform.controls['inn'].setValue(this.getClient().inn);
  }
  
  onSubmit() {
    this.update();
  }

  getClient() {
      return this.clientService.getCurrentClient();
  }


    private update() {
        let client: Client = {
            id: this.getClient().id,
            title: this.userform.controls['title'].value,
            alias: this.userform.controls['alias'].value,
            edrpou: this.userform.controls['edrpou'].value,
            vatCertificate: this.userform.controls['vatCertificate'].value,
            inn: this.userform.controls['inn'].value
        };
        this.clientService.updateClient(client)
            .subscribe(
                response => {
                    let msg = 'Клиент ' + response.alias + ' успешно обновлен (ID=' + response.id + ')';
                    this.msgs = [{severity: 'success', summary: 'Успешно', detail: msg}];
                    this.clientService.fetchAllClientDataPromise(response.id).then(
                        () => this.goBackToClient(0)
                    );
                }
            );
    }

  private goBackToClient(timeMillis: number) {
    setTimeout(
      () => {
        this.router.navigate([this.getClient().url]);
      }, timeMillis);
  }

}
