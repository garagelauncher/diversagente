import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { PrismaService } from 'src/shared/database/prisma.service';
import { PushNotificationsService } from 'src/shared/services/push-notifications/push-notifications.service';

@Module({
  controllers: [LikesController],
  providers: [LikesService, PrismaService, PushNotificationsService],
})
export class LikesModule {}
