import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;
}
