import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  id: string;

  @ApiProperty({
    example: 'john.doe',
    description: 'The username of the user',
  })
  username: string;
  @ApiProperty({
    example: 'john_doe@gmail.com',
    description: 'The email of the user',
  })
  email: string;
}
