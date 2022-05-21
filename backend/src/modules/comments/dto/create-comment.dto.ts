import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
    @ApiProperty()
    text: string;
    
    @ApiProperty()
    ownerId: string;

    @ApiProperty()
    postId: string;
}
