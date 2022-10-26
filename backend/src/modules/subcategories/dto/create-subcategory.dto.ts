import { ApiProperty } from '@nestjs/swagger';

export class CreateSubcategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    description: 'O título é utilizado para identificar o tema específico abordado pela subcategoria.',
    example: 'Alimentação',
  })
  title: string;

  @ApiProperty({
    description: 'Breve descrição do tema abordado pela categoria.',
    example: 'Nesta subcategoria haverão postagens de recomendação ou desaprovação de práticas de alimentação.',
  })
  description?: string;

  @ApiProperty({
    description: 'Id da categoria a qual o post pertence',
    example: 'mapiqeqmp-45642-hoeahue-1924903',
  })
  categoryId?: string;
}
