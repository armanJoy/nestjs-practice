import { ApiProperty } from '@nestjs/swagger';

export class Token {
  @ApiProperty()
  accessToken: string;
  constructor(accessToken) {
    this.accessToken = accessToken;
  }
}
