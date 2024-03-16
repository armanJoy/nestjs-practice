import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import UserRepository from './users.repository';
import { SingUpDto } from './dto/signup.dto';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/singin.dto';
import { Token } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async findUserByEmail(email: string): Promise<User> {
    const isUserExist = await this.userRepository.findOneBy({
      email: email,
    });

    return isUserExist;
  }
  async signup(userDto: SingUpDto): Promise<User> {
    console.log(userDto);
    const { email, password, username } = userDto;
    const isUserExist = await this.findUserByEmail(email);
    if (isUserExist) {
      throw new BadRequestException('User exist');
    }
    const hash = await argon.hash(password);

    const user: User = await this.userRepository.save({
      username: username,
      password: hash,
      email: email,
    });

    return user;
  }

  async login(singinDto: SigninDto): Promise<Token> {
    const { email, password } = singinDto;

    // Check if the user exists
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Verify password
    const isPasswordMatched = await argon.verify(user.password, password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = {
      userId: user.id,
    };
    // Generate access token
    const accessToken = await this.jwtService.signAsync(payload);
    return new Token(accessToken);
  }
}
