import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description:
      'Quantidade de estrelas equivalente ao grau de satisfação do usuário com o local em questão.',
    example: 3,
  })
  stars: number;

  @ApiProperty({
    description: 'Texto da review.',
    example: 'Fui ao local e também recomendo, muito agradável!',
  })
  text: string;

  @ApiProperty({
    description: 'Id do criador da review.',
    example: 'mapiqeqmp-45642-hoeahue-1924903',
  })
  ownerId: string;

  @ApiProperty({
    description: 'Id da localização a qual a review se refere.',
    example: 'hjudasfhasdu-18473-mnksadfjs-1924903',
  })
  locationId: string;
}
