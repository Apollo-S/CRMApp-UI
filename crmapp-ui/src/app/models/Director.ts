import {BaseModel} from "./BaseModel";
import {Post} from "./Post";

export abstract class Director extends BaseModel {
    public post?: Post;
    public fullName?: string;
    public shortName?: string;
    public dateStart?: Date;
    public postTitle?: string;
}