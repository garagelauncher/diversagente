import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { UserPreference } from '../entities/user.entity';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  picture?: string;

  @ApiProperty()
  biograph?: string;

  email?: string;
  username?: string;
  name?: string;
  birthdate?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  preferences?: UserPreference;
  lovelyCategoriesIds?: string[];
}
