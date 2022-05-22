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
import { SubcategoriesModule } from './modules/subcategories/subcategories.module';
import { LikesModule } from './modules/likes/likes.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { ReviewsModule } from './modules/reviews/reviews.module';

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
    SubcategoriesModule,
    LikesModule,
    PostsModule,
    CommentsModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryProvider],
})
export class AppModule {}
