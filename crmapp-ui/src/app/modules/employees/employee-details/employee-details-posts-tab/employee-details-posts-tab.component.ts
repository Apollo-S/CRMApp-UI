import {Component, OnInit} from '@angular/core';
import {Post} from "../../../../models/Post";

@Component({
    selector: 'app-employee-details-posts-tab',
    templateUrl: './employee-details-posts-tab.component.html',
    styleUrls: ['./employee-details-posts-tab.component.css']
})
export class EmployeeDetailsPostsTabComponent implements OnInit {
    columns = [];
    posts: Post[] = [];
    responsive: any;
    reorderableColumns: any;
    rows = 0;
    paginator = false;
    rowHover = false;
    loading: boolean;
    sortField: any;
    autoLayout: any;
    buttonTitle: {
        add: 'Новый адрес',
        edit: 'Изменить'
    };

    constructor() {
    }

    ngOnInit() {
    }

    refreshDatasource() {

    }
}
