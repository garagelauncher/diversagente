import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import packageJSON from '../package.json';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // security
  app.enableCors();
  app.use(helmet());

  // serve static files
  app.useStaticAssets(join(__dirname, '..', '..', 'public'), {
    prefix: '/public',
  });
  app.setViewEngine('html');

  const configService = app.get(ConfigService);

  // setup documentation
  const documentationConfig = new DocumentBuilder()
    .setTitle(packageJSON.name)
    .setDescription(packageJSON.description)
    .setVersion(packageJSON.version)
    .build();

  const document = SwaggerModule.createDocument(app, documentationConfig);
  SwaggerModule.setup('docs', app, document);

  // setup app
  const PORT = configService.get<number>('PORT') || 3000;
  Logger.debug(`Starting server on port ${PORT}...`);
  await app.listen(PORT);
}

bootstrap();
