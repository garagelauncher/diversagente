import { ApiProperty } from '@nestjs/swagger';
import { UserPreference } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'E-mail de registro do usuário.',
    example: 'fulano@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Nome pelo qual o usuário gostaria de ser chamado dentro da plataforma.',
    example: 'Diverso',
  })
  username: string;

  @ApiProperty({
    description: 'Nome vinculado a conta Google do usuário.',
    example: 'Luciano Neves',
  })
  name: string;

  @ApiProperty({
    description: 'Breve biografia descrita pelo próprio usuário.',
    example: 'Pai de uma menina autista em busca de um mundo melhor para as nossas crianças',
  })
  biograph?: string;

  @ApiProperty({
    description: 'Foto de perfil da conta Google do usuário',
    example: '[URL da imagem]',
  })
  picture?: string;

  @ApiProperty({
    description: 'Preferências escolhidas pelo usuário dentro da plataforma.',
    example: '',
  })
  preferences?: UserPreference;
}
