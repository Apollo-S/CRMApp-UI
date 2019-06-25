import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

// PrimeNG
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button'; 
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataListModule } from 'primeng/datalist';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { GrowlModule } from 'primeng/growl';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { InputSwitchModule } from 'primeng/inputswitch';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ListboxModule } from 'primeng/listbox';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PanelModule } from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SidebarModule } from 'primeng/sidebar';
import { SpinnerModule } from 'primeng/spinner';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TreeModule }  from 'primeng/tree';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

// Custom Service Imports
import { AppConst } from './app-const';
import { AgreementService } from './services/agreement.service';
import { CategoryService } from './services/category.service';
import { DocumentService } from './services/document.service';
import { DocumentStatusService } from './services/document-status.service';
import { DocumentTypeService } from './services/document-type.service';
import { EmployeeService } from './services/employee.service';
import { MailDocumentTypeService } from './services/mail-document-type.service';
import { MailInputService } from './services/mail-input.service';
import { MailOutputService } from './services/mail-output.service';
import { PersonService } from './services/person.service';
import { PostService } from './services/post.service';
import { VacationService } from './services/vacation.service';
import { UtilService } from './services/util.service';

// Component Imports 
import { AppComponent } from './app.component';
import { AboutComponent } from './modules/about/about.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { NavbarBottomComponent } from './modules/navbar/navbar-bottom/navbar-bottom.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardMenuComponent } from './modules/dashboard/dashboard-menu/dashboard-menu.component';
import { DashboardTableComponent } from './modules/dashboard/dashboard-table/dashboard-table.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

import { ClientsComponent } from './modules/clients/clients.component';
import { AddEditClientComponent } from './modules/clients/add-edit-client/add-edit-client.component';
import { ClientDetailsComponent } from './modules/clients/client-details/client-details.component';
import { ClientDetailsTabsComponent } from './modules/clients/client-details/client-details-tabs/client-details-tabs.component';
import { ClientDetailsMainTabComponent } from './modules/clients/client-details/client-details-main-tab/client-details-main-tab.component';
import { ClientDetailsAddressesTabComponent } from './modules/clients/client-details/client-details-addresses-tab/client-details-addresses-tab.component';
import { ClientDetailsAccountsTabComponent } from './modules/clients/client-details/client-details-accounts-tab/client-details-accounts-tab.component';
import { ClientDetailsDirectorsTabComponent } from './modules/clients/client-details/client-details-directors-tab/client-details-directors-tab.component';
import { ClientDetailsAgreementsTabComponent } from './modules/clients/client-details/client-details-agreements-tab/client-details-agreements-tab.component';

import { AgreementsComponent } from './modules/agreements/agreements.component';
import { AgreementDetailsComponent } from './modules/agreements/agreement-details/agreement-details.component';
import { AgreementDetailsDocumentsTabComponent } from './modules/agreements/agreement-details/agreement-details-documents-tab/agreement-details-documents-tab.component';

import { DocumentsComponent } from './modules/documents/documents.component';
import { DocumentDetailsComponent } from './modules/documents/document-details/document-details.component';

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
import { PersonsComponent } from './modules/person/persons/persons.component';
import { AddPersonComponent } from './modules/person/add-person/add-person.component';
import { EditPersonComponent } from './modules/person/edit-person/edit-person.component';
import { PersonDetailsComponent } from './modules/person/person-details/person-details.component';
import { LoadingStatusComponent } from './components/loading-status/loading-status.component';
import { NavbarMenuBarComponent } from './modules/navbar/navbar-menu-bar/navbar-menu-bar.component';
import { MainPageComponent } from './modules/main-page/main-page.component';
import { MailOutputsComponent } from './modules/mail-outputs/mail-outputs.component';
import { MailInputsComponent } from './modules/mail-inputs/mail-inputs.component';
import { AgreementDetailsTabsComponent } from './modules/agreements/agreement-details/agreement-details-tabs/agreement-details-tabs.component';
import { AgreementDetailsMainTabComponent } from './modules/agreements/agreement-details/agreement-details-main-tab/agreement-details-main-tab.component';
import { DocumentTypesComponent } from './modules/document-types/document-types.component';
import { ClientEmployeeDetailsTemplateTableComponent } from './templates/client-employee-details-template-table/client-employee-details-template-table.component';
import { ControlMessagesComponent } from './templates/control-messages/control-messages.component';
import { EmployeeDetailsVacationsTabComponent } from './modules/employees/employee-details/employee-details-vacations-tab/employee-details-vacations-tab.component';
import { EmployeeDetailsSicksTabComponent } from './modules/employees/employee-details/employee-details-sicks-tab/employee-details-sicks-tab.component';
import { AddEditAddressComponent } from './modules/clients/client-details/client-details-addresses-tab/add-edit-address/add-edit-address.component';
import { AddEditAccountComponent } from './modules/clients/client-details/client-details-accounts-tab/add-edit-account/add-edit-account.component';
import { AddEditDirectorComponent } from './modules/clients/client-details/client-details-directors-tab/add-edit-director/add-edit-director.component';
import { AddEditDocumentComponent } from './modules/documents/document-details/add-edit-document/add-edit-document.component';
import { AddEditAgreementComponent } from './modules/agreements/add-edit-agreement/add-edit-agreement.component';
import { SubscriptionService } from "./services/subscription.service";

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ClientsComponent,
    AgreementsComponent,
    NavbarComponent,
    NavbarBottomComponent,
    ClientDetailsComponent,
    SidebarComponent,
    DashboardComponent,
    DashboardMenuComponent,
    DashboardTableComponent,
    PageNotFoundComponent,
    EmployeesComponent,
    DocumentsComponent,
    ClientDetailsAgreementsTabComponent,
    ClientDetailsAddressesTabComponent,
    ClientDetailsAccountsTabComponent,
    ClientDetailsDirectorsTabComponent,
    EmployeeDetailsComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeeDetailsAddressesTabComponent,
    EmployeeDetailsAccountsTabComponent,
    AgreementDetailsComponent,
    VacationsComponent,
    VacationDetailsComponent,
    EmployeeDetailsMainTabComponent,
    EmployeeDetailsTabsComponent,
    ClientDetailsMainTabComponent,
    ClientDetailsTabsComponent,
    AddEditAddressComponent,
    AddEditAccountComponent,
    AddEditDirectorComponent,
    AgreementDetailsDocumentsTabComponent,
    PersonsComponent,
    AddPersonComponent,
    EditPersonComponent,
    PersonDetailsComponent,
    LoadingStatusComponent,
    NavbarMenuBarComponent,
    MainPageComponent,
    MailOutputsComponent,
    MailInputsComponent,
    AgreementDetailsTabsComponent,
    AgreementDetailsMainTabComponent,
    DocumentTypesComponent,
    ClientEmployeeDetailsTemplateTableComponent,
    ControlMessagesComponent,
    EmployeeDetailsVacationsTabComponent,
    EmployeeDetailsSicksTabComponent,
    DocumentDetailsComponent,
    AddEditDocumentComponent,
    AddEditClientComponent,
    AddEditAgreementComponent
  ],
  imports: [
    AppRoutingModule, 
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    BreadcrumbModule,
    ButtonModule, 
    CalendarModule,
    CardModule,
    CheckboxModule,
    ConfirmDialogModule,
    DataListModule,
    DataViewModule,
    DialogModule,
    DropdownModule,
    GrowlModule,
    FieldsetModule,
    InplaceModule,
    InputMaskModule,
    InputTextareaModule,
    InputTextModule, 
    InputSwitchModule,
    KeyFilterModule,
    ListboxModule,
    MenubarModule,
    MessageModule,
    MultiSelectModule,
    PaginatorModule,
    PanelMenuModule,
    PanelModule,
    ProgressSpinnerModule,
    SidebarModule,
    SpinnerModule,
    SplitButtonModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TieredMenuModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TreeModule,
  ],
  providers: [
    AppConst,
    AgreementService,
    CategoryService,
    ConfirmationService,
    DocumentService,
    DocumentStatusService,
    DocumentTypeService,
    EmployeeService,
    MailDocumentTypeService,
    MailInputService,
    MailOutputService,
    MessageService, 
    PersonService,
    PostService,
    VacationService,
    UtilService,
    SubscriptionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
