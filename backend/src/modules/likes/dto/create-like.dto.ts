import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  postId: string;
}
