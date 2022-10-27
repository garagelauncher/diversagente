import { Test, TestingModule } from '@nestjs/testing';
import { likeMock } from 'test/__mocks__/like';
import { LikesController } from '../../../src/modules/likes/likes.controller';
import { LikesService } from '../../../src/modules/likes/likes.service';

describe('LikesController', () => {
  let likesController: LikesController;
  let likesService: LikesService;

  beforeEach(async () => {
    const mockLikeService = {
      provide: LikesService,
      useValue: {
        findAll: jest.fn().mockResolvedValue([likeMock]),
        create: jest.fn().mockResolvedValue(likeMock),
        findOne: jest.fn().mockResolvedValue(likeMock),
        update: jest.fn().mockResolvedValue(likeMock),
        remove: jest.fn().mockResolvedValue(likeMock),
        fireAndForgetLikeNotification: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesController],
      providers: [LikesService, mockLikeService],
    }).compile();

    likesController = module.get<LikesController>(LikesController);
    likesService = module.get<LikesService>(LikesService);
  });

  it('should be defined', () => {
    expect(likesController).toBeDefined();
    expect(likesService).toBeDefined();
  });

  describe('success case', () => {
    const like = {
      id: 'pipipipipi-00000-popopopo-000000',
      ownerId: '',
      postId: '',
    };

    it('should be able to update a like', async () => {
      const updatedLike = await likesController.update(
        'pipipipipi-00000-popopopo-000000',
        {
          ownerId: 'aaaa',
        },
      );
      expect(updatedLike).toEqual(likeMock);
    });

    it('should be able to create a like', async () => {
      const createdLike = await likesController.create('', like);
      expect(createdLike).toEqual(likeMock);
    });

    it('should be able to find one like', async () => {
      const foundLike = await likesController.findOne(
        'pipipipipi-00000-popopopo-000000',
      );
      expect(foundLike).toEqual(likeMock);
    });

    it('should be able to delete a like', async () => {
      const deletedLike = await likesController.remove(
        'pipipipipi-00000-popopopo-000000',
        '',
      );
      expect(deletedLike).toEqual(likeMock);
    });

    it('should be able to findAll likes', async () => {
      const likes = await likesController.findAll();
      expect(likes).toEqual([likeMock]);
    });
  });
});
