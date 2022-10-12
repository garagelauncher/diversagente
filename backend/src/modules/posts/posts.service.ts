import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  PaginateOptions,
  parsePaginationToPrisma,
} from 'src/shared/utils/parsePaginationToPrisma';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

const countLikesAndCommentsQuery = {
  select: {
    comments: true,
    likes: true,
  },
};

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostDto: CreatePostDto) {
    return this.prisma.post.create({ data: createPostDto });
  }

  async findAll(options: PaginateOptions) {
    const { skip, take, where, orderBy, include, cursor } =
      parsePaginationToPrisma<
        Prisma.PostWhereInput,
        Prisma.PostInclude,
        Prisma.PostWhereUniqueInput
      >(options);

    return await this.prisma.post.findMany({
      skip,
      take,
      where,
      orderBy,
      cursor,
      include: {
        _count: countLikesAndCommentsQuery,
        owner: true,
        ...include,
      },
    });
  }

  async findOne(id: string, options: PaginateOptions) {
    const { where, include } = parsePaginationToPrisma<
      Prisma.PostWhereInput,
      Prisma.PostInclude
    >(options);

    const post = await this.prisma.post.findUnique({
      where: {
        id,
        ...where,
      },
      include: {
        _count: countLikesAndCommentsQuery,
        owner: true,
        ...include,
      },
    });
    return post;
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  remove(id: string) {
    return this.prisma.post.update({
      where: { id },
      data: {
        deletedAt: new Date().toISOString(),
        isActive: false,
      },
    });
  }
}
