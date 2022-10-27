import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CloudinaryModule } from 'src/shared/services/cloudinary/cloudinary.module';
import { CloudinaryService } from 'src/shared/services/cloudinary/cloudinary.service';

@Module({
  imports: [CloudinaryModule, CloudinaryService],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
