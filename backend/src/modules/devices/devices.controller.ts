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
import { ApiQuery } from '@nestjs/swagger';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';

@Controller('users/:ownerId/devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  async create(
    @Param('ownerId') ownerId: string,
    @Body() createDeviceDto: CreateDeviceDto,
  ) {
    return await this.devicesService.create({ ...createDeviceDto, ownerId });
  }

  @ApiQuery({
    name: 'filter',
    type: String,
    description: 'An optional filter',
    example: `{ "ownerId": "628922e7f555044cdccbbab3" }`,
    required: false,
  })
  @ApiQuery({
    name: 'sort',
    type: String,
    description: 'An optional sort',
    example: `["createdAt", "DESC"]`,
    required: false,
  })
  @ApiQuery({
    name: 'range',
    type: String,
    description: 'A optional range',
    example: `[0, 1]`,
    required: false,
  })
  @ApiQuery({
    name: 'include',
    type: String,
    description: 'An optional include',
    example: '{ "owner": true }',
    required: false,
  })
  @ApiQuery({
    name: 'cursor',
    type: String,
    description: 'An optional cursor, like {"id": "some-id-of-unique-data"}',
    required: false,
  })
  @Get()
  async findAll(
    @Query('filter') filter?: string,
    @Query('sort') sort?: string,
    @Query('range') range?: string,
    @Query('include') include?: string,
    @Query('cursor') cursor?: string,
  ) {
    return await this.devicesService.findAll({
      filter,
      sort,
      range,
      include,
      cursor,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.devicesService.findOne({
      id,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDeviceDto: UpdateDeviceDto,
  ) {
    return await this.devicesService.update(id, updateDeviceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.devicesService.remove(id);
  }
}
