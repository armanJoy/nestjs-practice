// tasks.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity'; // Import TaskRepository
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import TaskRepository from './task.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // Register TaskRepository
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}
