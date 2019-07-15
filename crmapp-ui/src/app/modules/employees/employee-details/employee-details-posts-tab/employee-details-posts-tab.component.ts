import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "app/models/Post";
import {Subscription} from "rxjs";
import {PostService} from "app/services/post.service";

@Component({
    selector: 'app-employee-details-posts-tab',
    templateUrl: './employee-details-posts-tab.component.html',
    styleUrls: ['./employee-details-posts-tab.component.css'],
    providers: [PostService]
})
export class EmployeeDetailsPostsTabComponent implements OnInit, OnDestroy {
    private subscribtion: Subscription = new Subscription();
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
        add: 'Добавить',
        edit: 'Изменить'
    };
    routerLinkUrl = ['add'];

    constructor(private postService: PostService) {
        this.initColumns();
        this.sortField = this.columns[0].field;
    }

    ngOnInit() {
        this.fetchData();
    }

    ngOnDestroy() {
        this.subscribtion.unsubscribe();
    }

    refreshDatasource() {
    }

    async fetchData() {
        let postsPromise = this.postService.getPosts().toPromise();
        this.posts = await postsPromise;
    }

    private initColumns() {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'post', header: 'Должность'},
            {field: 'dateStart', header: 'Действует с'}
        ];
    }

}
