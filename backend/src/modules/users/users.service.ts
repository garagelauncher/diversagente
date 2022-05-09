import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import crypto from 'crypto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: Omit<Prisma.UserCreateInput, 'id'>) {
    const newUser = { ...createUserDto, id: crypto.randomUUID() };

    const createdCat = await this.prisma.user.create({
      data: newUser,
    });

    return createdCat;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
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
