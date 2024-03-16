import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './user.entity';
import UserRepository from './users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly userRepositiyr: UserRepository,
  ) {
    super({
      secretOrKey: 'slkjlsdjflsj',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload): Promise<string> {
    const user: User = await this.userRepositiyr.findOneBy({
      id: payload.userId,
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user.id;
  }
}
