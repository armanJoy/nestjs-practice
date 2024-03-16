// task.repository.ts
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { Injectable } from '@nestjs/common';

// @Injectable()
class TaskRepository extends Repository<Task> {
  //   async findByIdAndUserId(
  //     id: string,
  //     userId: string,
  //   ): Promise<Task | undefined> {
  //     const task = await this.createQueryBuilder('task')
  //       .where('task.id = :id', { id })
  //       .andWhere('task.userId = :userId', { userId })
  //       .getOne();
  //     return task;
  //   }
}

export default TaskRepository; // Add this line to export the repository
