import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/task.input.dto';
import { Task } from './task.entity';
import { Request } from 'express';
import { AllTaskResponse } from './dto/alltask.response.dto';
import { TaskUpdateDto } from './dto/task.update.dto';
export declare class TasksController {
    private taskservie;
    constructor(taskservie: TasksService);
    getAllTasks(req: Request, page: number, limit: number): Promise<AllTaskResponse>;
    getTaskById(req: Request, id: string): Promise<Task>;
    createTask(req: Request, createTaskDto: CreateTaskDto): Promise<Task>;
    updateTaskStatus(req: Request, id: string, updateDto: TaskUpdateDto): Promise<Task>;
    deleteTaskById(req: Request, id: string): Promise<string>;
}
