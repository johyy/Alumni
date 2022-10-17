import { User } from "./user.model";

export interface Group {
    id: number;
    private: boolean;
    title: string;
    description: string;
    users: number[];
}