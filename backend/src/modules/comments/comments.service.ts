<<<<<<< HEAD
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
=======
import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  PaginateOptions,
  parsePaginationToPrisma,
} from 'src/shared/utils/parsePaginationToPrisma';
import { DeleteCommentDto } from './dto/delete-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
>>>>>>> refactor/setupTests

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

<<<<<<< HEAD
  create(createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({ data: createCommentDto });  }

  findAll() {
    return this.prisma.comment.findMany({});
=======
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
>>>>>>> refactor/setupTests
  }

  async findOne(id: string) {
    //return this.prisma.category.findUnique({ where: { id } });

    const comment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    });
    return comment;
  }

  update(id: string, UpdateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { id },
      data: UpdateCommentDto,
    });
  }

<<<<<<< HEAD
  remove(id: string) {
    return this.prisma.comment.delete({ where: { id } });
=======
  async remove({ id, postId }: DeleteCommentDto) {
    Logger.warn(`Removed like ${id} from post ${postId}`);
    return await this.prisma.comment.update({
      where: { id },
      data: {
        deactivatedAt: new Date().toISOString(),
        isActive: false,
      },
    });
>>>>>>> refactor/setupTests
  }
}
