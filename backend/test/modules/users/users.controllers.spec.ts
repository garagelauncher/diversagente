import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersService } from 'src/modules/users/users.service';
import { userMock } from 'test/__mocks__/user';


describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const mockUserService = {
      provide: UsersService,
      useValue: {
        findAll: jest.fn().mockResolvedValue([userMock]),
        create: jest.fn().mockResolvedValue(userMock),
        findOne: jest.fn().mockResolvedValue(userMock),
        update: jest.fn().mockResolvedValue(userMock),
        remove: jest.fn().mockResolvedValue(userMock),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, mockUserService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('success case', () => {
    const user = {
      id: 'aaaaaa-1111',
      email: "gabriel@email.com",
      username: "gabiru",
      name: "gabriel",
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    };

    it('should be able to update a user', async () => {
      const updatedUser = await usersController.update('aaaaaa-1111', {
        username: 'novoUsername',
      });
      expect(updatedUser).toEqual(userMock);
    });

    it('should be able to create a user', async () => {
      const createdUser = await usersController.create(user);
      expect(createdUser).toEqual(userMock);
    });

    it('should be able to find one user', async () => {
      const foundUser = await usersController.findOne('aaaaaa-1111');
      expect(foundUser).toEqual(userMock);
    });

    it('should be able to delete a user', async () => {
      const deletedUser = await usersController.remove('aaaaaa-1111');
      expect(deletedUser).toEqual(userMock);
    });

    it('should be able to findAll users', async () => {
      const users = await usersController.findAll();
      expect(users).toEqual([userMock]);
    });
  });
});
