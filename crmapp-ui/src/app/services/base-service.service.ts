import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

export abstract class BaseServiceService {

    protected constructor(private router: Router) {
    }

    goToUrl(address: any[]) {
       return this.router.navigate(address);
    }

}
