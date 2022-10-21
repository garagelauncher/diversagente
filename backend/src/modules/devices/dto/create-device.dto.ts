import { ApiProperty } from '@nestjs/swagger';

export class CreateDeviceDto {
  @ApiProperty()
  token: string;

  @ApiProperty()
  platform?: string;
}
