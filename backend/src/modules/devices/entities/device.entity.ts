import { ApiProperty } from '@nestjs/swagger';

export class Device {
  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  token: string;

  @ApiProperty()
  platform?: string;
}
