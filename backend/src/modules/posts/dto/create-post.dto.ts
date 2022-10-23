import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Título do post.',
    example: 'Exercícios de socialização na escola',
  })
  title: string;

  @ApiProperty({
    description: 'Texto do comentário.',
    example: 'A escola é local importante não apenas para aprendizado mas também para socialização...',
  })
  content: string;

  @ApiProperty({
    description: 'Id do criador do post.',
    example: 'mapiqeqmp-45642-hoeahue-1924903',
  })
  ownerId: string;

  @ApiProperty({
    description: 'Id da categoria a qual o post pertence',
    example: 'mapiqeqmp-45642-hoeahue-1924903',
  })
  categoryId?: string;

  @ApiProperty({
    description: 'Id da subcategoria a qual o post pertence',
    example: 'mapiqeqmp-45642-hoeahue-151513',
  })
  subcategoryId?: string;
}
