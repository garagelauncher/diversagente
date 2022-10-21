import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  PaginateOptions,
  parsePaginationToPrisma,
} from 'src/shared/utils/parsePaginationToPrisma';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@Injectable()
export class DevicesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDeviceDto: Device) {
    const isDeviceAlreadyRegistered = await this.prisma.device.findFirst({
      where: { token: createDeviceDto.token },
    });

    if (isDeviceAlreadyRegistered) {
      return await this.update(isDeviceAlreadyRegistered.id, {
        ...createDeviceDto,
      });
    }

    return await this.prisma.device.create({ data: createDeviceDto });
  }

  async findAll(options: PaginateOptions) {
    const { skip, take, where, orderBy, include, cursor } =
      parsePaginationToPrisma<Prisma.DeviceWhereInput>(options);

    return await this.prisma.device.findMany({
      skip,
      take,
      where,
      orderBy,
      include,
      cursor,
    });
  }

  async findOne(filter: Prisma.DeviceWhereUniqueInput) {
    const device = await this.prisma.device.findUnique({
      where: filter,
    });

    if (!device) {
      throw new NotFoundException(`device ${JSON.stringify(filter)} not found`);
    }

    return device;
  }

  async update(id: string, updateDeviceDto: UpdateDeviceDto) {
    return this.prisma.device.update({
      where: { id },
      data: updateDeviceDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.device.delete({
      where: { id },
    });
  }
}
