import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { TaskStatus } from './task.enum';
import { CreateTaskDto } from './dto/task.input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import TaskRepository from './task.repository';
import { AllTaskResponse } from './dto/alltask.response.dto';
import { TaskUpdateDto } from './dto/task.update.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) // Ensure correct injection
    private readonly taskRepository: TaskRepository,
  ) {}

  async getAllTasks(
    userId: any,
    limit: number,
    page: number,
  ): Promise<AllTaskResponse> {
    const skip = (limit - 1) * page; // Calculate the skip value based on page and limit
    const [tasks, total] = await this.taskRepository.findAndCount({
      where: { user: userId }, // Assuming 'user' is the property representing the relationship in the Task entity
      order: { createdAt: 'DESC' },
      take: page,
      skip: skip,
    });

    const result = new AllTaskResponse(tasks, total);

    return result;
  }

  async createTask(createTaskDto: CreateTaskDto, userId: any): Promise<Task> {
    const { title, description } = createTaskDto;

    return await this.taskRepository.save({
      title,
      description,
      status: TaskStatus.OPEN,
      user: userId,
    });
  }

  async getTaskById(id: string, userId: any): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id: id,
          user: userId,
        },
      });
      console.log(task);
      if (!task) {
        throw new NotFoundException();
      }
      const taskUserId = task.user;
      if (userId !== taskUserId) {
        throw new UnauthorizedException();
      }

      return task;
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error);
    }
  }

  async updateTaskStatus(id: string, updateDto: TaskUpdateDto) {
    try {
      if (!updateDto.title && !updateDto.status) {
        throw new BadRequestException();
      }
      const task = await this.taskRepository.findOneBy({ id });
      if (!task) {
        throw new BadRequestException();
      }
      if (updateDto.title && updateDto.status) {
        (task.title = updateDto.title), (task.status = updateDto.status);
      } else if (updateDto.title) {
        task.title = updateDto.title;
      } else if (updateDto.status) {
        task.status = updateDto.status;
      }

      return await this.taskRepository.save(task);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteTaskById(id: string, userId: any): Promise<string> {
    const task = await this.taskRepository.findOne({
      where: { id: id, user: userId },
    });
    if (!task) {
      throw new BadRequestException();
    }
    await this.taskRepository.remove(task);
    return 'success';
  }
}
