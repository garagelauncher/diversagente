import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from 'src/shared/services/cloudinary/cloudinary.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userFound = await this.findOne(createUserDto.email);

    if (!userFound) {
      const createdUser = await this.prisma.user.create({
        data: {
          email: createUserDto.email,
          username: createUserDto.username,
          name: createUserDto.name,
          preferences: createUserDto.preferences ?? {},
        },
      });

      return createdUser;
    }

    return userFound;
  }

  async findAll() {
    return await this.prisma.user.findMany({});
  }

  async findOne(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    Logger.debug('recovering user', user);

    return user;
  }

  async update(email: string, updateUserDTO: UpdateUserDto) {
    return await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        ...updateUserDTO,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async uploadAvatar(userEmail: string, file: Express.Multer.File) {
    try {
      const userFound = await this.findOne(userEmail);
      console.debug(userFound);

      if (!userFound) {
        throw new Error('User not found');
      }

      const result = await this.cloudinary.uploadImage(file, {
        folder: `users/${userFound.id}/pictures`,
      });

      const updatedData = await this.update(userFound.email, {
        picture: result.secure_url,
      });

      Logger.debug(result);
      return updatedData;
    } catch (error) {
      Logger.error(error);
      throw new BadRequestException('Invalid file type.');
    }
  }
}
