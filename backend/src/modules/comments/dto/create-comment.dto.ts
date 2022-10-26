import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Texto do comentário.',
    example: 'Ótimo conteúdo!',
  })
  text: string;

  @ApiProperty({
    description: 'Id do criador do comentário.',
    example: 'mapiqeqmp-45642-hoeahue-1924903',
  })
  ownerId: string;
}
