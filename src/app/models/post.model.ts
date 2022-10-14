import { Time } from "@angular/common";
import { Group } from "./group.model";
import { User } from "./user.model";

export interface Post {
    author: User;
    body: string;
    created_time: Time;
    id: number;
    original_post_id: Post;
    reply_posts: Post[];
    target_event_id: Event;
    target_group_id: Group;
    target_topic_id: number; // change to Topic when there is model
    title: string;
    updated_time: Time;
}