import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MockMongoModel } from '../../test/mocks/mock-mongo-model';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockUser: User = {
    name: 'Jon Snow',
    email: 'jon@snow.com',
  };

  const mockCreatedUser: { _id: string } = {
    _id: 's0meU5erId',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: MockMongoModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should save the builder', async () => {
      const mockMongoModelSaveSpy = jest
        .spyOn(MockMongoModel.prototype, 'save')
        .mockResolvedValueOnce(mockCreatedUser);

      const result = await service.create(mockUser);

      expect(mockMongoModelSaveSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCreatedUser);
    });
  });

  describe('search', () => {
    it('should be defined', () => {
      expect(service.search).toBeDefined();
    });

    it('should return an empty array when no users are found', async () => {
      const mockMongoModelFindSpy = jest
      .spyOn(MockMongoModel, 'find');
      const mockMongoModelExecSpy = jest
        .spyOn(MockMongoModel, 'exec')
        .mockResolvedValueOnce([]);

      const result = await service.search({ query: 'does-not-exist' });

      expect(mockMongoModelFindSpy).toHaveBeenCalledTimes(1);
      expect(mockMongoModelExecSpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual([]);
    });

    it ('should return an array of matching users', async () => {
      const mockMongoModelFindSpy = jest
      .spyOn(MockMongoModel, 'find');
      const mockMongoModelExecSpy = jest
      .spyOn(MockMongoModel, 'exec')
      .mockResolvedValueOnce([mockCreatedUser]);

      const result = await service.search({ query: 'jon' });

      expect(mockMongoModelFindSpy).toHaveBeenCalledTimes(1);
      expect(mockMongoModelExecSpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual([mockCreatedUser]);
    });
  });
});
