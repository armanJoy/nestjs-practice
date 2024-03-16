import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { Task } from '../task.entity';

export class AllTaskResponse {
  @ApiProperty({ type: Task, isArray: true })
  tasks: Task[];

  @ApiProperty()
  total: number;

  constructor(task, total) {
    (this.tasks = task), (this.total = total);
  }
}
