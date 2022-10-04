import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  content: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  categoryId?: string;

  @ApiProperty()
  subcategoryId?: string;
}
