import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: String,
  })
  @IsString()
  password: string;
}
