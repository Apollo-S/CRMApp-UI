import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/Category';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
    categories: MenuItem[] = [];
    loading: boolean;

    constructor(private categoryService: CategoryService) {
    }

    ngOnInit() {
        this.loading = true;
        this.categoryService.getCategories().toPromise()
            .then(
            categories => {
                this.categories = categories;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
            }
        );
    }

}
