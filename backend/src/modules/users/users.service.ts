import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import crypto from 'crypto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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
}
