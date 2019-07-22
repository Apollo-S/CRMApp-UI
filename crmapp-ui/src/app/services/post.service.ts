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

    constructor(http: HttpClient,
                private appConst: AppConst,
                router: Router,
                messageService: MessageService) {
        super(router, messageService, http);
        this.postsUrl = appConst.baseUrl + appConst.postsUrl + '/';
    }

    getPosts() {
        return super.fetchAll(this.postsUrl);
    }

    getPostById(postId: number) {
        return super.fetchOne(this.postsUrl + postId);
    }



}
