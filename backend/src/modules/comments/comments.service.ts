import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  PaginateOptions,
  parsePaginationToPrisma,
} from 'src/shared/utils/parsePaginationToPrisma';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCommentDto: Comment) {
    return this.prisma.comment.create({ data: createCommentDto });
  }

  async findAll(options: PaginateOptions) {
    const { skip, take, where, orderBy, include, cursor } =
      parsePaginationToPrisma<Prisma.CommentWhereInput>(options);

    return await this.prisma.comment.findMany({
      skip,
      take,
      where,
      orderBy,
      include,
      cursor,
    });
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }

    return comment;
  }

  update(id: string, UpdateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: UpdateCommentDto,
    });
  }

  async remove({ id, postId }: DeleteCommentDto) {
    Logger.warn(`Removed like ${id} from post ${postId}`);
    return await this.prisma.comment.update({
      where: { id },
      data: {
        deactivatedAt: new Date().toISOString(),
        isActive: false,
      },
    });
  }
}
