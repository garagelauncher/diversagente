import { Module } from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { SubcategoriesController } from './subcategories.controller';
import { PrismaService } from 'src/shared/database/prisma.service';

@Module({
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService, PrismaService],
})
export class SubcategoriesModule {}
