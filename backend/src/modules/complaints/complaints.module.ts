import { Module } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { ComplaintsController } from './complaints.controller';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  controllers: [ComplaintsController],
  providers: [ComplaintsService, PrismaService],
})
export class ComplaintsModule {}
