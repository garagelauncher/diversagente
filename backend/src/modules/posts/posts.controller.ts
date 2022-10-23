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
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiQuery } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);

  @ApiQuery({
    name: 'filter',
    type: String,
    description: 'An optional filter',
    example: `{"title":{"contains": "p"}}`,
    required: false,
  })
  @ApiQuery({
    name: 'include',
    type: String,
    description: 'An optional include',
    example: `{"likes":{"select":{"id":true},"where":{"ownerId":"aaaaaaaaaaaaaaaaaaaaaaaa"}}}`,
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
    example: `[1, 1]`,
    required: false,
  })
  @ApiQuery({
    name: 'cursor',
    type: String,
    description: 'An optional cursor',
    example: `{"id": "some-id-of-unique-data"}`,
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
    return await this.postsService.findAll({
      filter,
      sort,
      range,
      include,
      cursor,
    });
  }

  @ApiQuery({
    name: 'include',
    type: String,
    description: 'An optional include',
    example: `{"likes":{"select":{"id":true},"where":{"ownerId":"aaaaaaaaaaaaaaaaaaaaaaaa"}}}`,
    required: false,
  })
  @Get(':id')
  findOne(@Param('id') id: string, @Query('include') include?: string) {
    return this.postsService.findOne(id, { include });

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
