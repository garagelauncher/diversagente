import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty()
  ownerId: string;
}
