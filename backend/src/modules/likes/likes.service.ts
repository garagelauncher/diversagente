import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  PaginateOptions,
  parsePaginationToPrisma,
} from 'src/shared/utils/parsePaginationToPrisma';
import { CreateLikeDto } from './dto/create-like.dto';
import { DeleteLikeDto } from './dto/delete-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createLikeDto: CreateLikeDto) {
    return this.prisma.like.create({ data: createLikeDto });
  }

  async findAll(options: PaginateOptions) {
    const { skip, take, where, orderBy, include, cursor } =
      parsePaginationToPrisma<Prisma.LikeWhereInput>(options);

    return await this.prisma.like.findMany({
      skip,
      take,
      where,
      orderBy,
      include,
      cursor,
    });
  }

  async findOne(id: string) {
    const like = await this.prisma.like.findUnique({
      where: {
        id,
      },
    });

    if (!like) {
      throw new NotFoundException(`Like ${id} was not found`);
    }

    return like;
  }

  update(id: string, UpdateLikeDto: UpdateLikeDto) {
    return this.prisma.like.update({
      where: { id },
      data: UpdateLikeDto,
    });
  }

  remove({ postId, id }: DeleteLikeDto) {
    Logger.warn(`Removed like ${id} from post ${postId}`);
    return this.prisma.like.delete({ where: { id } });
  }
}
