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
  })
});
