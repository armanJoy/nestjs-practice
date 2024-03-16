import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../task.enum';

export class TaskUpdateDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ enum: [TaskStatus] })
  status: TaskStatus;
}
