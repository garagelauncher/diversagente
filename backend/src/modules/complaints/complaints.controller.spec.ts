import { Test, TestingModule } from '@nestjs/testing';
import { ComplaintsController } from './complaints.controller';
import { ComplaintsService } from './complaints.service';

describe('ComplaintsController', () => {
  let controller: ComplaintsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComplaintsController],
      providers: [ComplaintsService],
    }).compile();

    controller = module.get<ComplaintsController>(ComplaintsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
