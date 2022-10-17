import { Time } from "@angular/common";
import { User } from "./user.model";

export interface Post {
    author: User;
    body: string;
    created_time: Time;
    id: number;
    original_post_id: number;
    reply_posts: number[];
    target_event_id: number;
    target_group_id: number;
    target_topic_id: number;
    title: string;
    updated_time: Time;
}