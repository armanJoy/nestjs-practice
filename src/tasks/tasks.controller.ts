import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task.enum';
import { CreateTaskDto } from './dto/task.input.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NotFoundError } from 'rxjs';
import { AllTaskResponse } from './dto/alltask.response.dto';
import { TaskUpdateDto } from './dto/task.update.dto';
import { Util } from 'src/util/Util';

@ApiTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard())
@Controller('tasks')
export class TasksController {
  constructor(private taskservie: TasksService) {}

  @Get()
  @ApiQuery({ name: 'page', type: Number, required: false, example: 1 })
  @ApiQuery({ name: 'limit', type: Number, required: false, example: 10 })
  @ApiOkResponse({ type: AllTaskResponse })
  getAllTasks(
    @Req() req: Request,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    console.log(page, limit);
    limit = limit || 10;
    page = page || 1;
    return this.taskservie.getAllTasks(req.user, page, limit);
  }

  @Get('/:id')
  @ApiBody({ type: Task })
  async getTaskById(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<Task> {
    if (!Util.isValidUuuid(id)) {
      throw new BadRequestException();
    }
    return this.taskservie.getTaskById(id, req.user);
  }

  @Post()
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 200, description: 'Created', type: Task })
  @ApiForbiddenResponse({ type: NotFoundError })
  async createTask(
    @Req() req: Request,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    // console.log(req);
    const userId = req.user;
    console.log(userId);
    return await this.taskservie.createTask(createTaskDto, userId);
  }

  @Patch('/:id')
  @ApiBody({ type: TaskUpdateDto })
  @ApiOkResponse({ type: Task })
  updateTaskStatus(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateDto: TaskUpdateDto,
  ): Promise<Task> {
    if (!Util.isValidUuuid(id)) {
      throw new BadRequestException();
    }
    return this.taskservie.updateTaskStatus(id, updateDto);
  }

  @Delete('/:id')
  @ApiOkResponse({ type: String })
  deleteTaskById(
    @Req() req: Request,
    @Param('id') id: string,
  ): Promise<string> {
    const userId = req.user;
    if (!Util.isValidUuuid(id)) {
      throw new BadRequestException();
    }
    return this.taskservie.deleteTaskById(id, userId);
  }
}
