import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {MenuItem} from 'primeng/api';
import {UtilService} from "app/services/util.service";

@Component({
    selector: 'common-table-view-all',
    templateUrl: './common-table-view-all.component.html',
    styleUrls: ['./common-table-view-all.component.css']
})
export class CommonTableViewAllComponent implements OnInit {
    @Input() selectionMode: string = 'single';
    @Input() title: string;
    @Input() columns: Array<any>;
    @Input() datasource: Array<any>;
    @Input() responsive: boolean;
    @Input() reorderableColumns: boolean;
    @Input() rowHover: boolean;
    @Input() paginator: boolean;
    @Input() rows: number;
    @Input() loading: boolean;
    @Input() menuModel: Array<MenuItem>;
    @Input() sortField: string;
    @Input() autoLayout: boolean;
    @Input() addButtonTitle: string = 'Добавить';
    @Input() editButtonTitle: string = 'Редакт.';
    @Input() additionalButtonTitle: string = 'Прочее';
    @Input() updateButtonTitle: string = 'Обновить';
    @Output() refreshDatasource: EventEmitter<any> = new EventEmitter();
    @Input() selectedItem: any;
    @Input() datePattern = 'dd.MM.y';
    @Input() sortOrder = 1;
    dataKey = 'id';
    buttonState: boolean;

    constructor(private router: Router) {
    }

    ngOnInit() {
    }

    goToEntry(url: string) {
        this.router.navigate([url]);
    }

    initMenu(routerLinkUrl) {
        this.menuModel.forEach(
            (menu) => menu.routerLink = [routerLinkUrl, menu.title]
        );
    }

    refresh() {
        this.refreshDatasource.emit(true);
    }

    resolveFieldData(data: any, field: string) {
        return UtilService.resolveFieldData(data, field);
    }

    changeButtonState() {
        this.buttonState = !this.buttonState;
    }
}
