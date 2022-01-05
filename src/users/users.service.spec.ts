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
  })
});
