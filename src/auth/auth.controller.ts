import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingUpDto } from './dto/signup.dto';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { SigninDto } from './dto/singin.dto';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { Token } from './dto/token.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: SingUpDto })
  @ApiOkResponse({ description: 'User created successfully', type: UserDto })
  signup(@Body() signupDto: SingUpDto): Promise<User> {
    return this.authService.signup(signupDto);
  }

  @Post('signin')
  @ApiBody({ type: SigninDto })
  @ApiOkResponse({ description: 'Returns the access token', type: Token })
  signin(@Body() singinDto: SigninDto): Promise<Token> {
    return this.authService.login(singinDto);
  }
}
