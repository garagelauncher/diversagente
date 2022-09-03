import { Test, TestingModule } from '@nestjs/testing';
import { LikesService } from './../../../src/modules/likes/likes.service';
import { PrismaService } from './../../../src/shared/database/prisma.service';
import { likeMock } from 'test/__mocks__/like';
import { createPrismaProviderMock } from './../../__mocks__/prisma';


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
})

it('it should be able to create a like in a post', () => {
    const like = {
        ownerID: '1',
        postID: '1',
    }
});

it('should be able to delete a like from a post', async () => {
    const deletedLike = await likeService.remove(
        'pipipipipi-00000-popopopo-000000'
    );
    expect(deletedLike).toEqual(likeMock);
})

})