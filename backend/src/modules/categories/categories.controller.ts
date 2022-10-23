import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
<<<<<<< HEAD
} from '@nestjs/common';
=======
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
>>>>>>> refactor/setupTests
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

<<<<<<< HEAD
=======
@ApiTags('Categories')
>>>>>>> refactor/setupTests
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

<<<<<<< HEAD
  @Get()
  findAll() {
    return this.categoriesService.findAll();
=======
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
    return await this.categoriesService.findAll({
      filter,
      sort,
      range,
      include,
      cursor,
    });
>>>>>>> refactor/setupTests
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
