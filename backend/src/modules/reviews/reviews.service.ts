import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import {
  PaginateOptions,
  parsePaginationToPrisma,
} from 'src/shared/utils/parsePaginationToPrisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    return await this.prisma.review.create({
      data: createReviewDto,
    });
  }

  async findAll(options: PaginateOptions) {
    const { skip, take, where, orderBy, include, cursor } =
      parsePaginationToPrisma<Prisma.ReviewWhereInput>(options);

    return await this.prisma.review.findMany({
      skip,
      take,
      where,
      orderBy,
      include,
      cursor,
    });
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({
      where: {
        id,
      },
      include: {
        owner: true,
      },
    });

    if (!review) {
      throw new NotFoundException(`Review ${id} was not found`);
    }

    return review;
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    return await this.prisma.review.update({
      where: {
        id,
      },
      data: updateReviewDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.review.update({
      where: { id },
      data: {
        deactivatedAt: new Date().toISOString(),
        isActive: false,
      },
    });
  }
}
