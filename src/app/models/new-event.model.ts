import { Time } from "@angular/common";

export interface NewEvent {
    title: string;
    description: string;
    date_time_begin: Time;
    date_time_end: Time;
    guest_capacity: number;
}