import { ApiProperty } from '@nestjs/swagger';

export class CreateSubcategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  categoriesIds?: string[];
}
