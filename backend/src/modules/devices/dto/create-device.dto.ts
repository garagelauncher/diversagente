import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty({
    description: 'Id de push notification do celular do usuário.',
    example: 'aoijakp-381378-euahclcn-173198',
  })
  token: string;

  @ApiProperty({
    description: 'Modelo do celular, caso seja possível captar.',
    example: 'Samsung Galaxy M31',
  })
  platform?: string;
}
