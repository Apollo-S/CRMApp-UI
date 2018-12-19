import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './modules/about/about.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { NavbarBottomComponent } from './modules/navbar/navbar-bottom/navbar-bottom.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardMenuComponent } from './modules/dashboard/dashboard-menu/dashboard-menu.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

import { ClientsComponent } from './modules/clients/clients.component';
import { AddClientComponent } from './modules/clients/add-client/add-client.component';
import { EditClientComponent } from './modules/clients/edit-client/edit-client.component';
import { ClientDetailsComponent } from './modules/clients/client-details/client-details.component';
import { ClientDetailsTabsComponent } from './modules/clients/client-details/client-details-tabs/client-details-tabs.component';
import { ClientDetailsMainTabComponent } from './modules/clients/client-details/client-details-main-tab/client-details-main-tab.component';
import { ClientDetailsAddressesTabComponent } from './modules/clients/client-details/client-details-addresses-tab/client-details-addresses-tab.component';
import { ClientDetailsAccountsTabComponent } from './modules/clients/client-details/client-details-accounts-tab/client-details-accounts-tab.component';
import { AddAccountComponent } from './modules/clients/client-details/client-details-accounts-tab/add-account/add-account.component';
import { EditAccountComponent } from './modules/clients/client-details/client-details-accounts-tab/edit-account/edit-account.component';
import { ClientDetailsDirectorsTabComponent } from './modules/clients/client-details/client-details-directors-tab/client-details-directors-tab.component';
import { AddDirectorComponent } from './modules/clients/client-details/client-details-directors-tab/add-director/add-director.component';
import { EditDirectorComponent } from './modules/clients/client-details/client-details-directors-tab/edit-director/edit-director.component';
import { ClientDetailsAgreementsTabComponent } from './modules/clients/client-details/client-details-agreements-tab/client-details-agreements-tab.component';

import { AgreementsComponent } from './modules/agreements/agreements.component';
import { AddAgreementComponent } from './modules/agreements/add-agreement/add-agreement.component';
import { EditAgreementComponent } from './modules/agreements/edit-agreement/edit-agreement.component';
import { AgreementDetailsComponent } from './modules/agreements/agreement-details/agreement-details.component';
import { AgreementDetailsDocumentsTabComponent } from './modules/agreements/agreement-details/agreement-details-documents-tab/agreement-details-documents-tab.component';

import { DocumentsComponent } from './modules/documents/documents.component';

import { EmployeesComponent } from './modules/employees/employees.component';
import { AddEmployeeComponent } from './modules/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './modules/employees/edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './modules/employees/employee-details/employee-details.component';
import { EmployeeDetailsTabsComponent } from './modules/employees/employee-details/employee-details-tabs/employee-details-tabs.component';
import { EmployeeDetailsMainTabComponent } from './modules/employees/employee-details/employee-details-main-tab/employee-details-main-tab.component';
import { EmployeeDetailsAddressesTabComponent } from './modules/employees/employee-details/employee-details-addresses-tab/employee-details-addresses-tab.component';
import { EmployeeDetailsAccountsTabComponent } from './modules/employees/employee-details/employee-details-accounts-tab/employee-details-accounts-tab.component';

import { VacationsComponent } from './modules/vacation/vacations/vacations.component';
import { VacationDetailsComponent } from './modules/vacation/vacation-details/vacation-details.component';
import { PersonsComponent } from "./modules/person/persons/persons.component";
import { AddPersonComponent } from "./modules/person/add-person/add-person.component";
import { PersonDetailsComponent } from "./modules/person/person-details/person-details.component";
import { MainPageComponent } from "./modules/main-page/main-page.component";
import { MailOutputsComponent } from "./modules/mail-outputs/mail-outputs.component";
import { AgreementDetailsMainTabComponent } from "./modules/agreements/agreement-details/agreement-details-main-tab/agreement-details-main-tab.component";
import { MailInputsComponent } from "./modules/mail-inputs/mail-inputs.component";
import { DocumentTypesComponent } from "./modules/document-types/document-types.component";
import { EmployeeDetailsVacationsTabComponent } from "./modules/employees/employee-details/employee-details-vacations-tab/employee-details-vacations-tab.component";
import { EmployeeDetailsSicksTabComponent } from "./modules/employees/employee-details/employee-details-sicks-tab/employee-details-sicks-tab.component";
import {AddEditAddressComponent} from "./modules/clients/client-details/client-details-addresses-tab/add-edit-address/add-edit-address.component";

const appRoutes: Routes = [
  
  {path: '', component:DashboardComponent, 
    children: [
      {path: '', component:MainPageComponent},
      {path: 'clients', component:ClientsComponent},
      {path: 'clients/add', component:AddClientComponent},
      {path: 'clients/:id', component:ClientDetailsComponent,
        children: [
          {path:  '', redirectTo: 'main', pathMatch: 'full'},
          {path: 'main', component: ClientDetailsMainTabComponent},
          {path: 'main/edit', component:EditClientComponent},
          {path: 'addresses', component: ClientDetailsAddressesTabComponent},
          {path: 'addresses/add', component:AddEditAddressComponent},
          {path: 'addresses/:id', component:AddEditAddressComponent,
            children: [
              {path:  '', redirectTo: 'edit', pathMatch: 'full'},
              {path: 'edit', component:AddEditAddressComponent},
            ]
          },
          {path: 'accounts', component: ClientDetailsAccountsTabComponent},
          {path: 'accounts/add', component: AddAccountComponent},
          {path: 'accounts/:id', component: EditAccountComponent,
          children: [
              {path:  '', redirectTo: 'edit', pathMatch: 'full'},
              {path: 'edit', component:EditAccountComponent},
            ]
          },
          {path: 'directors', component: ClientDetailsDirectorsTabComponent},
          {path: 'directors/add', component: AddDirectorComponent},
          {path: 'directors/:id', component: EditDirectorComponent,
            children: [
              {path:  '', redirectTo: 'edit', pathMatch: 'full'},
              {path: 'edit', component:EditDirectorComponent},
            ]
          },
          {path: 'agreements', component: ClientDetailsAgreementsTabComponent},
          {path: 'agreements/add', component: AddAgreementComponent},
          {path: 'agreements/:id', component: AgreementDetailsComponent},
        ]
      },
      {path: 'employees', component:EmployeesComponent},
      {path: 'employees/add', component: AddEmployeeComponent},
      {path: 'employees/:id', component: EmployeeDetailsComponent, 
        children: [
          {path:  '', redirectTo: 'main', pathMatch: 'full'},
          {path: 'main', component: EmployeeDetailsMainTabComponent},
          {path: 'main/edit', component: EditEmployeeComponent},
          {path: 'addresses', component: EmployeeDetailsAddressesTabComponent},
          {path: 'accounts', component: EmployeeDetailsAccountsTabComponent},
          {path: 'vacations', component:EmployeeDetailsVacationsTabComponent},
          {path: 'sicks', component:EmployeeDetailsSicksTabComponent},
        ]
      },
      {path: 'documents', component:DocumentsComponent},
      {path: 'vacations', component:VacationsComponent},
      {path: 'agreements', component:AgreementsComponent},
      {path: 'agreements/add', component: AddAgreementComponent},
      {path: 'agreements/:id', component: AgreementDetailsComponent,
        children: [
          {path:  '', redirectTo: 'main', pathMatch: 'full'},
          {path: 'main', component: AgreementDetailsMainTabComponent},
          {path: 'main/edit', component: EditAgreementComponent},
          {path: 'documents', component: AgreementDetailsDocumentsTabComponent}
        ]
      },
      {path: 'persons', component:PersonsComponent},
      {path: 'persons/add', component:AddPersonComponent},
      {path: 'persons/:id', component: PersonDetailsComponent},
      {path: 'about', component:AboutComponent},
      {path: 'mail-outputs', component:MailOutputsComponent},
      {path: 'mail-inputs', component:MailInputsComponent},
      {path: 'document-types', component:DocumentTypesComponent},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}