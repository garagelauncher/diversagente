import { ApiProperty } from '@nestjs/swagger';

export class Like {
  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  postId: string;
}
