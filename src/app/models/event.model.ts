import { Time } from "@angular/common";
import { User } from "./user.model";

export interface Event {
    id: number;
    title: string;
    description: string;
    host: User;
    date_time_begin: Time;
    date_time_end: Time;
    updated_time: Time;
    guest_capacity: number;
}