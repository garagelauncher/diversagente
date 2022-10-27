import { ApiProperty } from '@nestjs/swagger';
import { Coordinates } from 'src/shared/contracts/Coordinates';

export class CreateLocationDto {
  @ApiProperty({
    description: 'Título do local avaliado.',
    example: 'Parque do Ibirapuera',
  })
  title: string;

  @ApiProperty({
    description: 'Foto do local avaliado.',
    example: '["https://i.imgur.com/removed.png"]',
  })
  photos?: string[];

  @ApiProperty({
    description: 'Descrição dada pelo criador do local avaliado.',
    example: 'Parque amplo e tranquilo.',
  })
  description?: string;

  @ApiProperty({
    description: 'Endereço do local avaliado.',
    example:
      'Av. Pedro Álvares Cabral - Vila Mariana, São Paulo - SP, 04094-050',
  })
  address?: string;

  @ApiProperty({
    description: 'Coordenadas do local de acordo com a API do Google Maps.',
    example: { latitude: 23.5874, longitude: 46.6576 },
  })
  coordinates: Coordinates;

  @ApiProperty({
    description: 'Id do usuário criador do local avaliado.',
    example: 'mapiqeqmp-45642-hoeahue-1924903',
  })
  ownerId: string;

  @ApiProperty({
    description: 'Id da categoria do local avaliado.',
    example: '635ac4605aac5b264639f283',
  })
  categoryId: string;

  @ApiProperty({
    description: 'Ícone do local avaliado.',
    example: 'church',
  })
  icon?: string;

  @ApiProperty({
    description: 'Provedor do ícone do local avaliado.',
    example: 'Feather',
  })
  iconProvider?: string;
}
