import { Like } from './../../../src/modules/likes/entities/like.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { LikesService } from './../../../src/modules/likes/likes.service';
import { PrismaService } from './../../../src/shared/database/prisma.service';
import { createPrismaProviderMock } from './../../__mocks__/prisma';

describe('LikesService', () => {
    let likeService: LikesService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LikesService, createPrismaProviderMock()],
            }).compile();
    })
})