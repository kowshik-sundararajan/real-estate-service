import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MockMongoModel } from '../../test/mocks/mock-mongo-model';
import { CitiesService } from './cities.service';
import { City } from './entities/city.entity';

describe('CitiesService', () => {
  let service: CitiesService;

  const mockCity: City = {
    name: 'Singapore',
    code: 'SG'
  };

  const mockCreatedCity: { _id: string } = {
    _id: 's0meC1tyId'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        {
          provide: getModelToken(City.name),
          useValue: MockMongoModel
        }
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
        .mockResolvedValueOnce(mockCreatedCity);

      const result = await service.create(mockCity);

      expect(mockMongoModelSaveSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCreatedCity);
    });
  });

  describe('search', () => {
    it('should be defined', () => {
      expect(service.search).toBeDefined();
    });

    it('should return an empty array when no cities are found', async () => {
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

    it ('should return an array of matching cities', async () => {
      const mockMongoModelFindSpy = jest
      .spyOn(MockMongoModel, 'find');
      const mockMongoModelExecSpy = jest
      .spyOn(MockMongoModel, 'exec')
      .mockResolvedValueOnce([mockCreatedCity]);

      const result = await service.search({ query: 'singapore' });

      expect(mockMongoModelFindSpy).toHaveBeenCalledTimes(1);
      expect(mockMongoModelExecSpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual([mockCreatedCity]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should return an empty object if the city is not found', async () => {
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

    it('should return the matching city', async () => {
      const mockMongoModelFindByIdSpy = jest
      .spyOn(MockMongoModel, 'findById');
      const mockMongoModelExecSpy = jest
        .spyOn(MockMongoModel, 'exec')
        .mockResolvedValueOnce(mockCreatedCity);

      const result = await service.findOne({ id: 's0mePr0jectId' });

      expect(mockMongoModelFindByIdSpy).toHaveBeenCalledTimes(1);
      expect(mockMongoModelExecSpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(mockCreatedCity);
    });
  });
});
