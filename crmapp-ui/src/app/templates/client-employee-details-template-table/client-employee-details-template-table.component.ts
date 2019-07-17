import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-client-employee-details-template-table',
    templateUrl: './client-employee-details-template-table.component.html',
    styleUrls: ['./client-employee-details-template-table.component.css']
})
export class ClientEmployeeDetailsTemplateTableComponent implements OnInit {

    @Input() addButtonTitle: string;
    @Input() editButtonTitle: string;
    @Input() columns: any[];
    @Input() datasource: any[];
    @Input() responsive: boolean;
    @Input() reorderableColumns: boolean;
    @Input() rowHover: boolean;
    @Input() paginator: boolean;
    @Input() rows: number;
    @Input() loading: boolean;
    @Input() sortField: string;
    @Input() autoLayout: boolean;
    @Input() routerLinkUrl: string[];
    selectedItem: any;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    goToEntry(url: string) {
        this.router.navigate([url]);
    }

}
