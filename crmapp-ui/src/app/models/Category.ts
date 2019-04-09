import {BaseModel} from "./BaseModel";

export class Category extends BaseModel {
        public label?: string;
        public collapsedIcon?: any;
        public expandedIcon?: any;
        public data?: any;
        public routerLink?: string;
        public comment?: string;
}
