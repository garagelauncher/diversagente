import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { fireFunctionAndForget } from 'src/shared/utils/fireFunctionAndForget';

@ApiTags('Likes')
@Controller('posts/:postId/likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async create(
    @Param('postId') postId: string,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    const createdLike = await this.likesService.create({
      ...createLikeDto,
      postId,
    });

    // this.likesService.fireAndForgetLikeNotification(createdLike);
    return createdLike;
  }

  @ApiQuery({
    name: 'filter',
    type: String,
    description: 'An optional filter',
    example: `{ "postId": "628922e7f555044cdccbbab3" }`,
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    description: 'An optional sort',
    example: `["createdAt", "DESC"]`,
    required: false,
  })
  @ApiQuery({
    name: 'range',
    type: String,
    description: 'A optional range',
    example: `[0, 1]`,
    required: false,
  })
  @ApiQuery({
    name: 'include',
    type: String,
    description: 'An optional include',
    example: '{ "owner": true }',
    required: false,
  })
  @ApiQuery({
    name: 'cursor',
    type: String,
    description: 'An optional cursor, like {"id": "some-id-of-unique-data"}',
    required: false,
  })
  @Get()
  async findAll(
    @Query('filter') filter?: string,
    @Query('sort') sort?: string,
    @Query('range') range?: string,
    @Query('include') include?: string,
    @Query('cursor') cursor?: string,
  ) {
    return await this.likesService.findAll({
      filter,
      sort,
      range,
      include,
      cursor,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likesService.update(id, updateLikeDto);
  }

  @Delete(':id')
  remove(@Param('postId') postId: string, @Param('id') id: string) {
    return this.likesService.remove({ postId, id });
  }
}
