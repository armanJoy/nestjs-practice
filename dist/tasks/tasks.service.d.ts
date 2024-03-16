import { CreateTaskDto } from './dto/task.input.dto';
import { Task } from './task.entity';
import TaskRepository from './task.repository';
import { AllTaskResponse } from './dto/alltask.response.dto';
import { TaskUpdateDto } from './dto/task.update.dto';
export declare class TasksService {
    private readonly taskRepository;
    constructor(taskRepository: TaskRepository);
    getAllTasks(userId: any, limit: number, page: number): Promise<AllTaskResponse>;
    createTask(createTaskDto: CreateTaskDto, userId: any): Promise<Task>;
    getTaskById(id: string, userId: any): Promise<Task>;
    updateTaskStatus(id: string, updateDto: TaskUpdateDto): Promise<Task>;
    deleteTaskById(id: string, userId: any): Promise<string>;
}
