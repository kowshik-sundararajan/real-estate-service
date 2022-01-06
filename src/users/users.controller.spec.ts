import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = createMock<UsersService>();

  const mockUser: User = {
    _id: new Types.ObjectId,
    id: new Types.ObjectId,
    name: 'Jon Snow',
    email: 'jon@snow.com'
  };

  const mockCreateUserDto: CreateUserDto = {
    name: 'Jon Snow',
    email: 'jon@snow.com'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(controller.create).toBeDefined();
    });

    it ('should raise an error if the service call fails', async () => {
      const expectedError = new Error('service error');
      mockUsersService.create.mockRejectedValue(expectedError);
      await expect(controller.create(mockCreateUserDto)).rejects.toThrow(expectedError);
    });

    it ('should return the created user', async () => {
      mockUsersService.create.mockResolvedValue(mockUser);
      const result = await controller.create(mockCreateUserDto);
      expect(result).toBe(mockUser);
    });
  });

  describe('search', () => {
    it('should be defined', () => {
      expect(controller.search).toBeDefined();
    });

    it ('should raise an error if the service call fails', async () => {
      const expectedError = new Error('service error');
      mockUsersService.search.mockRejectedValue(expectedError);
      await expect(controller.search({ query: 'error-query' })).rejects.toThrow(expectedError);
    });

    it ('should return the matching users', async () => {
      mockUsersService.search.mockResolvedValue([mockUser]);
      const result = await controller.search({ query: 'Sloane' });
      expect(result).toStrictEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it ('should raise an error if the service call fails', async () => {
      const expectedError = new Error('service error');
      mockUsersService.findOne.mockRejectedValue(expectedError);
      await expect(controller.findOne({ id: 'does-not-exist' })).rejects.toThrow(expectedError);
    });

    it ('should return the matching user', async () => {
      mockUsersService.findOne.mockResolvedValue(mockUser);
      const result = await controller.findOne({ id: mockUser.id.toString() });
      expect(result).toBe(mockUser);
    });
  });
});
