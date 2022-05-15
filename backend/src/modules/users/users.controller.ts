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
  Request,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request as ExpressRequest } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    const user = await this.usersService.findOne(email);

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
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Request() request: ExpressRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.debug(request.params.email);
    console.debug(file);

    return this.usersService.uploadImageToCloudinary(
      request.params.email,
      file,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
