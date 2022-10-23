import { ApiProperty } from '@nestjs/swagger';

export class CreateComplaintDto {
  @ApiProperty()
  reason: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  resource: 'post' | 'comment' | 'review' | 'location';

  @ApiProperty()
  resourceId: string;

  @ApiProperty()
  message?: string;

  @ApiProperty()
  data?: string;
}
