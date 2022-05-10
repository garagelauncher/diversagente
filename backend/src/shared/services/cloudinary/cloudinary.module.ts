import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CloudinaryProvider } from './cloudinary';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [CloudinaryProvider, CloudinaryService, ConfigService],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
