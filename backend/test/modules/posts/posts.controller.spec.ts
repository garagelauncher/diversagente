import { Test, TestingModule } from '@nestjs/testing';
import { postMock } from 'test/__mocks__/post';
import { PostsController } from '../../../src/modules/posts/posts.controller';
import { PostsService } from '../../../src/modules/posts/posts.service';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  beforeEach(async () => {
    const mockPostService = {
      provide: PostsService,
      useValue: {
        findAll: jest.fn().mockResolvedValue([postMock]),
        create: jest.fn().mockResolvedValue(postMock),
        findOne: jest.fn().mockResolvedValue(postMock),
        update: jest.fn().mockResolvedValue(postMock),
        remove: jest.fn().mockResolvedValue(postMock),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService, mockPostService],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(postsController).toBeDefined();
    expect(postsService).toBeDefined();
  });

  describe('success case', () => {
    const post = {
      title: 'Localização mock',
      content: 'Descrição da localização mock',
      ownerId: 'hjudasfhasdu-18473-mnksadfjs-1924903',
    };

    it('should be able to update a post', async () => {
      const updatedPost = await postsController.update(
        'hjudasfhasdu-18473-mnksadfjs-1924903',
        {
          title: 'Localização mock alterado',
        },
      );
      expect(updatedPost).toEqual(postMock);
    });

    it('should be able to create a post', async () => {
      const createdPost = await postsController.create(post);
      expect(createdPost).toEqual(postMock);
    });

    it('should be able to find one post', async () => {
      const foundPost = await postsController.findOne(
        'hjudasfhasdu-18473-mnksadfjs-1924903',
      );
      expect(foundPost).toEqual(postMock);
    });

    it('should be able to delete a post', async () => {
      const deletedLocation = await postsController.remove(
        'hjudasfhasdu-18473-mnksadfjs-1924903',
      );
      expect(deletedLocation).toEqual(postMock);
    });

    it('should be able to findAll posts', async () => {
      const posts = await postsController.findAll();
      expect(posts).toEqual([postMock]);
    });
  });
});
