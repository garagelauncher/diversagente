import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from 'src/shared/services/cloudinary/cloudinary.service';
import { CreateUserDto } from './dto/create-user.dto';
<<<<<<< HEAD
import { NotFoundError } from 'rxjs';
=======
>>>>>>> refactor/setupTests

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
<<<<<<< HEAD
=======
          picture: createUserDto.picture,
>>>>>>> refactor/setupTests
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

<<<<<<< HEAD
  async remove(id: string) {
    return await this.prisma.user.delete({
      where: {
        id,
=======
  async remove(id: string, reason = 'No reason provided') {
    const deactivatedAt = new Date().toISOString();

    await this.prisma.review.updateMany({
      where: {
        ownerId: id,
      },
      data: {
        deactivatedAt,
        isActive: false,
      },
    });

    await this.prisma.comment.updateMany({
      where: {
        ownerId: id,
      },
      data: {
        deactivatedAt,
        isActive: false,
      },
    });

    await this.prisma.post.updateMany({
      where: {
        ownerId: id,
      },
      data: {
        deactivatedAt,
        isActive: false,
      },
    });

    return await this.prisma.user.update({
      where: { id },
      data: {
        deactivatedAt,
        isActive: false,
        deactivationReason: reason,
>>>>>>> refactor/setupTests
      },
    });
  }

<<<<<<< HEAD
  async uploadImageToCloudinary(userEmail: string, file: Express.Multer.File) {
=======
  async uploadAvatar(userEmail: string, file: Express.Multer.File) {
>>>>>>> refactor/setupTests
    try {
      const userFound = await this.findOne(userEmail);
      console.debug(userFound);

      if (!userFound) {
        throw new Error('User not found');
      }

<<<<<<< HEAD
      const result = await this.cloudinary.uploadImage({
        ...file,
        destination: `users/${userFound.id}`,
=======
      const result = await this.cloudinary.uploadImage(file, {
        folder: `users/${userFound.id}/pictures`,
>>>>>>> refactor/setupTests
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
