import { Repository } from 'typeorm';
import { User } from './user.entity';
export default class UserRepository extends Repository<User> {
}
