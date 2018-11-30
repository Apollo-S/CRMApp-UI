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
  clientForm: FormGroup;
  // client: Client = {};

  constructor(private formBuilder: FormBuilder,
              private clientService: ClientService,
              private router: Router) {
      // this.getClient();
  }

  ngOnInit() {
      this.clientForm = this.formBuilder.group({
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
      this.clientForm.controls['title'].setValue(this.getClient().title);
      this.clientForm.controls['alias'].setValue(this.getClient().alias);
      this.clientForm.controls['edrpou'].setValue(this.getClient().edrpou);
      this.clientForm.controls['vatCertificate'].setValue(this.getClient().vatCertificate);
      this.clientForm.controls['inn'].setValue(this.getClient().inn);
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
            title: this.clientForm.controls['title'].value,
            alias: this.clientForm.controls['alias'].value,
            edrpou: this.clientForm.controls['edrpou'].value,
            vatCertificate: this.clientForm.controls['vatCertificate'].value,
            inn: this.clientForm.controls['inn'].value
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
