<<<<<<< HEAD
export class Comment {}
=======
import { ApiProperty } from '@nestjs/swagger';

export class Comment {
  @ApiProperty()
  text: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  postId: string;
}
>>>>>>> refactor/setupTests
