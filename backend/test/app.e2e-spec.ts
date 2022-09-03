import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { createPrismaProviderMock } from './__mocks__/prisma';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { CloudinaryProvider } from 'src/shared/services/cloudinary/cloudinary';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [AppService, CloudinaryProvider, createPrismaProviderMock()],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(302)
      .expect('Found. Redirecting to /public');
  });

  it('should be 2 + 2 equal 4', () => {
    expect(2 + 2).toBe(4);
  });
});
