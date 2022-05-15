import { ApiProperty } from '@nestjs/swagger';
import { UserPreference } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  preferences?: UserPreference;
}
