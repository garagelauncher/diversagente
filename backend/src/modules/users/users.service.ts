import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import crypto from 'crypto';
import { Prisma } from '@prisma/client';
import { CloudinaryService } from 'src/shared/services/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async create(createUserDto: Omit<Prisma.UserCreateInput, 'id'>) {
    const userFound = await this.findOne(createUserDto.email);
    console.log(userFound);
    if (!userFound) {
      const newUser = { ...createUserDto, id: crypto.randomUUID() };

      const createdCat = await this.prisma.user.create({
        data: newUser,
      });

      return createdCat;
    }

    return userFound;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async uploadImageToCloudinary(userEmail: string, file: Express.Multer.File) {
    try {
      const userFound = await this.findOne(userEmail);
      console.debug(userFound);
      const result = await this.cloudinary.uploadImage({
        ...file,
        destination: `users/${userFound.id}`,
      });

      const updatedData = await this.update(userFound.email, {
        picture: result.secure_url,
      });

      console.debug(result);
      return updatedData;
    } catch (error) {
      console.error(error);
      throw new BadRequestException('Invalid file type.');
    }
  }
}
