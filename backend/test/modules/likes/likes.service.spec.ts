import { Test, TestingModule } from '@nestjs/testing';
import { LikesService } from './../../../src/modules/likes/likes.service';
import { PrismaService } from './../../../src/shared/database/prisma.service';
import { likeMock } from 'test/__mocks__/like';
import { createPrismaProviderMock } from './../../__mocks__/prisma';
import { CreateLikeDto } from 'src/modules/likes/dto/create-like.dto';
import { throwError } from 'rxjs';


describe('LikesService', () => {
    let likeService: LikesService;
    let prisma: PrismaService;

    beforeEach(async () => {
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
    }
    const createdLike = await likeService.create(like);
    expect(createdLike).toEqual(likeMock);
});

it('should not be able to create a like in a post with success', async () => {
    const like = {
        ownerId: '1',
        postId: '1',
    }
    
    const createdLike = await likeService.create(like);
    prisma.like.create = jest.fn().mockRejectedValue(like)

    await expect(likeService.create(like)).rejects.toThrowError('Something wrong happened when you tried to like this post.');
});

it('should be able to delete a like from a post', async () => {
    const deletedLike = await likeService.remove(
        'pipipipipi-00000-popopopo-000000'
    );
    expect(deletedLike).toEqual(likeMock);
});
});