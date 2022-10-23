import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  controllers: [DevicesController],
  providers: [DevicesService, PrismaService],
})
export class DevicesModule {}
