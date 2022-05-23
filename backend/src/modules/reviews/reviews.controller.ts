import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('locations/:locationId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  async create(
    @Param('locationId') locationId: string,
    @Body() createReviewDto: CreateReviewDto,
  ) {
    Logger.debug(`Creating a new review for location ${locationId}`);
    Logger.debug(createReviewDto);
    return await this.reviewsService.create({ locationId, ...createReviewDto });
  }

  @Get()
  async findAll(@Param('locationId') locationId: string) {
    return await this.reviewsService.findAll({ locationId });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.reviewsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return await this.reviewsService.update(id, updateReviewDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.reviewsService.remove(id);
  }
}
