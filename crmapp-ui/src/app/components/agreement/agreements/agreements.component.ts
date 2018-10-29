import { Component, OnInit } from '@angular/core';
import { AgreementService } from '../../../services/agreement.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.css']
})
export class AgreementsComponent implements OnInit {
  columns: Array<any> = [];
  items: Array<MenuItem> = [];

  constructor(private agreementService: AgreementService) {
      this.initColumns();
      this.initMenu();
  }

  ngOnInit() {}

  getAgreements() {
      return this.agreementService.getAgreements();
  }

  private initColumns() {
    this.columns = [
      { field: 'clientAlias', header: 'Контрагент', filterBy: 'contains' },
      { field: 'number', header: 'Номер', filterBy: 'contains' },
      { field: 'dateStart', header: 'Дата', filterBy: 'contains' }
    ];
  }

  private initMenu() {
    this.items = [
      { label: 'Связ. документы', icon: 'fa fa-file-text-o', title: 'documents' }
    ];
  }

}