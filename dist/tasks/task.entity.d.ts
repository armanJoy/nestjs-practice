import { TaskStatus } from './task.enum';
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}
