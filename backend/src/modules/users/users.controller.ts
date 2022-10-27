import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeleteUserDto } from './dto/delete-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiQuery({
    name: 'filter',
    type: String,
    description: 'An optional filter',
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
    description: 'A optional range as [1, 1]',
    required: false,
  })
  @ApiQuery({
    name: 'cursor',
    type: String,
    description: 'An optional cursor',
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
    return await this.usersService.findAll({
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
    example: `{"_count":{"select":{"Comment":true,"Like":true,"Post":true,"Review":true,"Location":true,"Complaint":true}}}`,
    required: false,
  })
  @Get(':email')
  async findOne(
    @Param('email') email: string,
    @Query('include') include?: string,
  ) {
    const user = await this.usersService.findOne(email, { include });

    if (!user) {
      throw new NotFoundException(`User with email ${email} was not found.`);
    }

    return user;
  }

  @Patch(':email')
  update(@Param('email') email: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(email, updateUserDto);
  }

  @Patch(':email/avatar')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadFile(
    @Param('email') email: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.debug(email);
    console.debug(file);

    return this.usersService.uploadAvatar(email, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() deleteUserDto?: DeleteUserDto) {
    return this.usersService.remove(id, deleteUserDto?.reason);
  }
}
