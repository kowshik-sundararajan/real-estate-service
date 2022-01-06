import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MockMongoModel } from '../../test/mocks/mock-mongo-model';
import { BuildersService } from './builders.service';
import { Builder } from './entities/builder.entity';

describe('BuildersService', () => {
  let service: BuildersService;

  const mockBuilder: Builder = {
    name: 'Sloane constructions',
    registrationNumber: 'SGREG123'
  };

  const mockCreatedBuilder: { _id: string } = {
    _id: 's0meBu1lderId',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BuildersService,
        {
          provide: getModelToken(Builder.name),
          useValue: MockMongoModel
        }
      ],
    }).compile();

    service = module.get<BuildersService>(BuildersService);
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
        .mockResolvedValueOnce(mockCreatedBuilder);

      const result = await service.create(mockBuilder);

      expect(mockMongoModelSaveSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCreatedBuilder);
    });
  });

  describe('search', () => {
    it('should be defined', () => {
      expect(service.search).toBeDefined();
    });

    it('should return an empty array when no builders are found', async () => {
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

    it ('should return an array of matching builders', async () => {
      const mockMongoModelFindSpy = jest
      .spyOn(MockMongoModel, 'find');
      const mockMongoModelExecSpy = jest
      .spyOn(MockMongoModel, 'exec')
      .mockResolvedValueOnce([mockCreatedBuilder]);

      const result = await service.search({ query: 'Sloane' });

      expect(mockMongoModelFindSpy).toHaveBeenCalledTimes(1);
      expect(mockMongoModelExecSpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual([mockCreatedBuilder]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should return an empty object if the builder is not found', async () => {
      const mockMongoModelFindByIdSpy = jest
      .spyOn(MockMongoModel, 'findById');
      const mockMongoModelExecSpy = jest
        .spyOn(MockMongoModel, 'exec')
        .mockResolvedValueOnce({});

      const result = await service.findOne({ id: 'does-not-exist' });

      expect(mockMongoModelFindByIdSpy).toHaveBeenCalledTimes(1);
      expect(mockMongoModelExecSpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual({});
    });

    it('should return the matching builder', async () => {
      const mockMongoModelFindByIdSpy = jest
      .spyOn(MockMongoModel, 'findById');
      const mockMongoModelExecSpy = jest
        .spyOn(MockMongoModel, 'exec')
        .mockResolvedValueOnce(mockCreatedBuilder);

      const result = await service.findOne({ id: 's0meBu1lderId' });

      expect(mockMongoModelFindByIdSpy).toHaveBeenCalledTimes(1);
      expect(mockMongoModelExecSpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(mockCreatedBuilder);
    });
  });
});
