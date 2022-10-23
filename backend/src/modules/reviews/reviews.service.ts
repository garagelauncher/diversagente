<<<<<<< HEAD
import { Injectable, Logger } from '@nestjs/common';
=======
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
>>>>>>> refactor/setupTests
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import dayjs from 'dayjs';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    return await this.prisma.review.create({
      data: createReviewDto,
    });
  }

  async findAll({
    locationId,
    period,
  }: {
    locationId: string;
    period: dayjs.ManipulateType;
  }) {
    Logger.debug(locationId);
    Logger.debug(period);
    return await this.prisma.review.findMany({
      where: {
        locationId,
        createdAt: {
          gt: dayjs().subtract(1, period).toDate(),
        },
      },
      include: {
        owner: true,
      },
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
<<<<<<< HEAD
    console.debug(review);
=======

    if (!review) {
      throw new NotFoundException(`Review ${id} was not found`);
    }

>>>>>>> refactor/setupTests
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
<<<<<<< HEAD
    return await this.prisma.review.delete({
      where: {
        id,
=======
    return await this.prisma.review.update({
      where: { id },
      data: {
        deactivatedAt: new Date().toISOString(),
        isActive: false,
>>>>>>> refactor/setupTests
      },
    });
  }
}
