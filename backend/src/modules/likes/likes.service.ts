import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLikeDto: CreateLikeDto) {
    return this.prisma.like.create({ data: createLikeDto });
  }

  findAll() {
    return this.prisma.like.findMany({});
  }

  async findOne(id: string) {
    //return this.prisma.category.findUnique({ where: { id } });

    const like = await this.prisma.like.findUnique({
      where: {
        id,
      },
    });
    return like;
  }

  update(id: string, UpdateLikeDto: UpdateLikeDto) {
    return this.prisma.like.update({
      where: { id },
      data: UpdateLikeDto,
    });
  }

  remove(id: string) {
    return this.prisma.like.delete({ where: { id } });
  }
}
