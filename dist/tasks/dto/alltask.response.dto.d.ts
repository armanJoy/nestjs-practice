import { Task } from '../task.entity';
export declare class AllTaskResponse {
    tasks: Task[];
    total: number;
    constructor(task: any, total: any);
}
