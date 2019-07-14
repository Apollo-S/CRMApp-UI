import {NgModule} from "@angular/core";
import {RouterModule, Routes} from '@angular/router';

import {AboutComponent} from './modules/about/about.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';

import {ClientsComponent} from './modules/clients/clients.component';
import {ClientDetailsComponent} from './modules/clients/client-details/client-details.component';
import {ClientDetailsMainTabComponent} from './modules/clients/client-details/client-details-main-tab/client-details-main-tab.component';
import {ClientDetailsAddressesTabComponent} from './modules/clients/client-details/client-details-addresses-tab/client-details-addresses-tab.component';
import {ClientDetailsAccountsTabComponent} from './modules/clients/client-details/client-details-accounts-tab/client-details-accounts-tab.component';
import {ClientDetailsDirectorsTabComponent} from './modules/clients/client-details/client-details-directors-tab/client-details-directors-tab.component';
import {ClientDetailsAgreementsTabComponent} from './modules/clients/client-details/client-details-agreements-tab/client-details-agreements-tab.component';

import {AgreementsComponent} from './modules/agreements/agreements.component';
import {AgreementDetailsComponent} from './modules/agreements/agreement-details/agreement-details.component';
import {AgreementDetailsDocumentsTabComponent} from './modules/agreements/agreement-details/agreement-details-documents-tab/agreement-details-documents-tab.component';

import {DocumentsComponent} from './modules/documents/documents.component';

import {EmployeesComponent} from './modules/employees/employees.component';
import {EmployeeDetailsComponent} from './modules/employees/employee-details/employee-details.component';
import {EmployeeDetailsMainTabComponent} from './modules/employees/employee-details/employee-details-main-tab/employee-details-main-tab.component';
import {EmployeeDetailsAddressesTabComponent} from './modules/employees/employee-details/employee-details-addresses-tab/employee-details-addresses-tab.component';
import {EmployeeDetailsAccountsTabComponent} from './modules/employees/employee-details/employee-details-accounts-tab/employee-details-accounts-tab.component';

import {VacationsComponent} from './modules/vacation/vacations/vacations.component';
import {PersonsComponent} from "./modules/persons/persons.component";
import {AddPersonComponent} from "./modules/persons/add-person/add-person.component";
import {PersonDetailsComponent} from "./modules/persons/person-details/person-details.component";
import {MainPageComponent} from "./modules/main-page/main-page.component";
import {MailOutputsComponent} from "./modules/mail-outputs/mail-outputs.component";
import {AgreementDetailsMainTabComponent} from "./modules/agreements/agreement-details/agreement-details-main-tab/agreement-details-main-tab.component";
import {MailInputsComponent} from "./modules/mail-inputs/mail-inputs.component";
import {DocumentTypesComponent} from "./modules/document-types/document-types.component";
import {EmployeeDetailsVacationsTabComponent} from "./modules/employees/employee-details/employee-details-vacations-tab/employee-details-vacations-tab.component";
import {EmployeeDetailsSicksTabComponent} from "./modules/employees/employee-details/employee-details-sicks-tab/employee-details-sicks-tab.component";
import {AddEditAddressComponent} from "./modules/clients/client-details/client-details-addresses-tab/add-edit-address/add-edit-address.component";
import {AddEditAccountComponent} from "./modules/clients/client-details/client-details-accounts-tab/add-edit-account/add-edit-account.component";
import {AddEditDirectorComponent} from "./modules/clients/client-details/client-details-directors-tab/add-edit-director/add-edit-director.component";
import {DocumentDetailsComponent} from "./modules/documents/document-details/document-details.component";
import {AddEditClientComponent} from "./modules/clients/add-edit-client/add-edit-client.component";
import {AddEditAgreementComponent} from "./modules/agreements/add-edit-agreement/add-edit-agreement.component";
import {AddEditEmployeeComponent} from "./modules/employees/add-edit-employee/add-edit-employee.component";
import {EmployeeDetailsPostsTabComponent} from "./modules/employees/employee-details/employee-details-posts-tab/employee-details-posts-tab.component";

const appRoutes: Routes = [

    {
        path: '', component: DashboardComponent,
        children: [
            {path: '', component: MainPageComponent},
            {path: 'clients', component: ClientsComponent},
            {path: 'clients/add', component: AddEditClientComponent},
            {
                path: 'clients/:id', component: ClientDetailsComponent,
                children: [
                    {path: '', redirectTo: 'main', pathMatch: 'full'},
                    {path: 'main', component: ClientDetailsMainTabComponent},
                    {path: 'main/edit', component: AddEditClientComponent},
                    {path: 'addresses', component: ClientDetailsAddressesTabComponent},
                    {path: 'addresses/add', component: AddEditAddressComponent},
                    {
                        path: 'addresses/:id', component: AddEditAddressComponent,
                        children: [
                            {path: '', redirectTo: 'edit', pathMatch: 'full'},
                            {path: 'edit', component: AddEditAddressComponent},
                        ]
                    },
                    {path: 'accounts', component: ClientDetailsAccountsTabComponent},
                    {path: 'accounts/add', component: AddEditAccountComponent},
                    {
                        path: 'accounts/:id', component: AddEditAccountComponent,
                        children: [
                            {path: '', redirectTo: 'edit', pathMatch: 'full'},
                            {path: 'edit', component: AddEditAccountComponent},
                        ]
                    },
                    {path: 'directors', component: ClientDetailsDirectorsTabComponent},
                    {path: 'directors/add', component: AddEditDirectorComponent},
                    {
                        path: 'directors/:id', component: AddEditDirectorComponent,
                        children: [
                            {path: '', redirectTo: 'edit', pathMatch: 'full'},
                            {path: 'edit', component: AddEditDirectorComponent},
                        ]
                    },
                    {path: 'agreements', component: ClientDetailsAgreementsTabComponent},
                    {path: 'agreements/add', component: AddEditAgreementComponent},
                    {path: 'agreements/:id', component: AgreementDetailsComponent},
                ]
            },
            {path: 'employees', component: EmployeesComponent},
            {path: 'employees/add', component: AddEditEmployeeComponent},
            {
                path: 'employees/:id', component: EmployeeDetailsComponent,
                children: [
                    {path: '', redirectTo: 'main', pathMatch: 'full'},
                    {path: 'main', component: EmployeeDetailsMainTabComponent},
                    {path: 'main/edit', component: AddEditEmployeeComponent},
                    {path: 'posts', component: EmployeeDetailsPostsTabComponent},
                    {path: 'addresses', component: EmployeeDetailsAddressesTabComponent},
                    {path: 'accounts', component: EmployeeDetailsAccountsTabComponent},
                    {path: 'vacations', component: EmployeeDetailsVacationsTabComponent},
                    {path: 'sicks', component: EmployeeDetailsSicksTabComponent},
                ]
            },
            {path: 'documents', component: DocumentsComponent},
            {path: 'documents/add', component: DocumentDetailsComponent},
            {path: 'documents/:id', component: DocumentDetailsComponent},

            {path: 'vacations', component: VacationsComponent},
            {path: 'agreements', component: AgreementsComponent},
            {path: 'agreements/add', component: AddEditAgreementComponent},
            {
                path: 'agreements/:id', component: AgreementDetailsComponent,
                children: [
                    {path: '', redirectTo: 'main', pathMatch: 'full'},
                    {path: 'main', component: AgreementDetailsMainTabComponent},
                    {path: 'main/edit', component: AddEditAgreementComponent},
                    {path: 'documents', component: AgreementDetailsDocumentsTabComponent}
                ]
            },
            {path: 'persons', component: PersonsComponent},
            {path: 'persons/add', component: AddPersonComponent},
            {path: 'persons/:id', component: PersonDetailsComponent},
            {path: 'about', component: AboutComponent},
            {path: 'mail-outputs', component: MailOutputsComponent},
            {path: 'mail-inputs', component: MailInputsComponent},
            {path: 'document-types', component: DocumentTypesComponent},
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
export class AppRoutingModule {
}