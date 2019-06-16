import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Post} from '../models/Post';
import {AppConst} from "../app-const";
import {catchError} from "rxjs/operators";
import {BaseService} from "./base.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Injectable()
export class PostService extends BaseService<Post> {

    private readonly postsUrl;
    protected readonly headers;

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.postsUrl = appConst.baseUrl + appConst.postsUrl + '/';
        this.headers = appConst.headersJSON;
    }

    getPosts() {
        const url = this.postsUrl;
        return this.http.get<Post[]>(url, {headers: this.headers})
            .pipe(catchError(this.handleError<Post[]>(
                'Ошибка при загрузке должностей!'
            )));
    }

    getPostById(postId: number) {
        const url = this.postsUrl + postId;
        return this.http.get(url, {headers: this.headers})
            .pipe(catchError(this.handleError<Post>(
                'Ошибка при загрузке должности с ID=' + postId + '!'
            )));
    }

}
