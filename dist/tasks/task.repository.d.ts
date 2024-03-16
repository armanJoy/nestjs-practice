import { Repository } from 'typeorm';
import { Task } from './task.entity';
declare class TaskRepository extends Repository<Task> {
}
export default TaskRepository;
