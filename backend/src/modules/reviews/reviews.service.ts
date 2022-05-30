import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReviewDto: CreateReviewDto) {
    return await this.prisma.review.create({
      data: createReviewDto,
    });
  }

  async findAll({ locationId }: { locationId: string }) {
    return await this.prisma.review.findMany({
      where: {
        location: {
          id: locationId,
        },
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
    console.debug(review);
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
    return await this.prisma.review.delete({
      where: {
        id,
      },
    });
  }
}
