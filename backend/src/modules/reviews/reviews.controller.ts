import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import dayjs from 'dayjs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
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
    return await this.reviewsService.create({ ...createReviewDto, locationId });
  }

  @Get()
  async findAll(
    @Param('locationId') locationId: string,
    @Query('period')
    period: dayjs.ManipulateType = 'week',
  ) {
    return await this.reviewsService.findAll({ locationId, period });
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
