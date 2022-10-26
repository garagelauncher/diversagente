import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  icon?: string;

  @ApiProperty()
  iconProvider?: string;

  @ApiProperty()
  description?: string;
}
