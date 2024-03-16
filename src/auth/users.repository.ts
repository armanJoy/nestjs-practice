import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Injectable } from '@nestjs/common';

// @Injectable()
export default class UserRepository extends Repository<User> {}
