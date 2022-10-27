import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    description:
      'O título é utilizado para identificar o tema geral abordado pela categoria.',
    example: 'Saúde',
  })
  title: string;

  @ApiProperty({
    description:
      'O nome do ícone será utilizado como elemento visual da categoria.',
    example: 'book',
  })
  icon?: string;

  @ApiProperty({
    description:
      'O nome do provedor de ícone será utilizado como elemento visual da categoria.',
    example: 'Feather',
  })
  iconProvider?: string;

  @ApiProperty({
    description: 'Breve descrição do tema abordado pela categoria.',
    example:
      'Nesta categoria poderão ser debatidos temas como alimentação, rotina de exercícios e desenvolvimento social',
  })
  description?: string;
}
