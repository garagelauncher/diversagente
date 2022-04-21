import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentationConfig = new DocumentBuilder()
    .setTitle('API documentation')
    .setDescription('The API endpoints')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, documentationConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
