import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  async create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  async findAll(
    @Query('latitude') latitude: number,
    @Query('longitude') longitude: number,
    @Query('distanceInKilometer') distanceInKilometer: number,
    @Query('limit') limit: number,
  ) {
    return await this.locationsService.findNear({
      latitude: Number(latitude || 0),
      longitude: Number(longitude || 0),
      distanceInKilometer: Number(distanceInKilometer || 1),
      limit: Number(limit || 1),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.locationsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.locationsService.remove(id);
  }
}
