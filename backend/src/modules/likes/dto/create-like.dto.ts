import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    description: 'Id do post ao qual o like pertence.',
    example: 'mapiqeqmp-45642-hoeahue-1924903',
  })
  ownerId: string;
}
