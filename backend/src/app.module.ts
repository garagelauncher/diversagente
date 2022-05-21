import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './modules/cats/cats.module';
import { UsersModule } from './modules/users/users.module';
import { CloudinaryModule } from './shared/services/cloudinary/cloudinary.module';
import { CloudinaryProvider } from './shared/services/cloudinary/cloudinary';
import { CategoriesModule } from './modules/categories/categories.module';
import { LocationsModule } from './modules/locations/locations.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SubcategoriesModule } from './modules/subcategories/subcategories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CatsModule,
    UsersModule,
    CloudinaryModule,
    CategoriesModule,
    LocationsModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    SubcategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryProvider],
})
export class AppModule {}
