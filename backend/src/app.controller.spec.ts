import { Test, TestingModule } from '@nestjs/testing';
import { Response as ExpressResponse } from 'express';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should redirect user', async () => {
      const response = {
        status: jest.fn().mockReturnThis(),
        redirect: jest.fn().mockReturnThis(),
      } as unknown as ExpressResponse;

      await appController.index(response);

      expect(response.status).toHaveBeenCalledWith(301);
    });
  });
});
