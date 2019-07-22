import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from "app/models/Post";
import {Subscription} from "rxjs";
import {PostService} from "app/services/post.service";
import {EmployeePostService} from "../../../../services/employee-post.service";
import {SubscriptionService} from "../../../../services/subscription.service";
import {Employee} from "../../../../models/Employee";
import {EmployeePost} from "../../../../models/EmployeePost";

@Component({
    selector: 'app-employee-details-posts-tab',
    templateUrl: './employee-details-posts-tab.component.html',
    styleUrls: ['./employee-details-posts-tab.component.css'],
    providers: [PostService, EmployeePostService]
})
export class EmployeeDetailsPostsTabComponent implements OnInit, OnDestroy {
    private subscription: Subscription = new Subscription();
    employee: Employee = new Employee();
    employeePosts: EmployeePost[] = [];
    columns = [];
    posts: Post[] = [];
    responsive: any;
    reorderableColumns: any;
    rows = 0;
    paginator = false;
    rowHover = false;
    loading: boolean;
    sortField: any;
    sortOrder: number;
    autoLayout: any;
    buttonTitle = {add: 'Новый', edit: 'Изменить'};
    routerLinkUrl = ['add'];

    constructor(private subscriptionService: SubscriptionService,
                private postService: PostService,
                private employeePostService: EmployeePostService) {
        this.initColumns();
        this.sortField = 'dateStart';
        this.sortOrder = -1;
    }

    ngOnInit() {
        this.loading = true;
        this.subscription = this.subscriptionService.getCurrentEmployee()
            .subscribe(employee => {
                this.employee = employee;
                if (employee.id !== undefined) {
                    try {
                        this.employeePostService.fetchAllBy(employee.id)
                            .subscribe(posts => {
                                this.posts = posts;
                                this.loading = false;
                            })
                    } catch (e) {
                        console.log(e);
                        this.loading = false;
                    }
                }
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    refreshDatasource() {
    }

    private initColumns() {
        this.columns = [
            {field: 'id', header: 'ID'},
            {field: 'post.title', header: 'Должность'},
            {field: 'dateStart', header: 'Действует с', dateField: true}
        ];
    }

}
