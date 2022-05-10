/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import crypto from 'crypto';

@Injectable()
export class CatsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCatDto: CreateCatDto) {
    const createdCat = await this.prisma.cat.create({
      data: {
        ...createCatDto,
        id: crypto.randomUUID(),
      },
    });

    return createdCat;
  }

  async findAll() {
    return await this.prisma.cat.findMany({});
  }

  async findOne(id: string) {
    return await this.prisma.cat.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    return await this.prisma.cat.update({
      where: {
        id,
      },
      data: {
        ...updateCatDto,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.cat.delete({
      where: {
        id,
      },
    });
  }
}
