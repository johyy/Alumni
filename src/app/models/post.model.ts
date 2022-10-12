import { Time } from "@angular/common";
import { User } from "./user.model";

export interface Post {
    id: number;
    title: string;
    body: string;
    author: User;
    created_time: Time;
    updated_time: Time;
    original_post_id: number; //or Post??
}