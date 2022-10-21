import { Test, TestingModule } from '@nestjs/testing';
import { LikesService } from './../../../src/modules/likes/likes.service';
import { PrismaService } from './../../../src/shared/database/prisma.service';
import { likeMock } from 'test/__mocks__/like';
import { createPrismaProviderMock } from './../../__mocks__/prisma';
import { PushNotificationsService } from 'src/shared/services/push-notifications/push-notifications.service';

describe('LikesService', () => {
  let likeService: LikesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const mockPushNotificationServiceService = {
      provide: PushNotificationsService,
      useValue: {
        sendPushNotifications: jest.fn(),
      },
    };


    const module: TestingModule = await Test.createTestingModule({
      providers: [LikesService, createPrismaProviderMock()],
    }).compile();

    likeService = module.get<LikesService>(LikesService);
    prisma = module.get<PrismaService>(PrismaService);

    prisma.like.create = jest.fn().mockResolvedValue(likeMock);
    prisma.like.delete = jest.fn().mockResolvedValue(likeMock);
  });

  it('should be defined', () => {
    expect(likeService).toBeDefined();
  });

  it('it should be able to create a like in a post with success', async () => {
    const like = {
      ownerId: '1',
      postId: '1',
    };
    const createdLike = await likeService.create(like);
    expect(createdLike).toEqual(likeMock);
  });

  it('should not be able to get a like that doest exists', async () => {
    prisma.like.findUnique = jest.fn().mockResolvedValue(undefined);

    await expect(
      likeService.findOne('pipipipipi-00000-popopopo-000000'),
    ).rejects.toThrowError(
      'Like pipipipipi-00000-popopopo-000000 was not found',
    );
  });

  it('should be able to delete a like from a post', async () => {
    const deletedLike = await likeService.remove({
      postId: 'pipipipipi-00000-popopopo-000000',
      id: 'pipipipipi-00000-popopopo-000000',
    });
    expect(deletedLike).toEqual(likeMock);
  });
});
