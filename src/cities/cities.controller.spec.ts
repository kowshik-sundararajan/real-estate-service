import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';

describe('CitiesController', () => {
  let controller: CitiesController;

  const mockCitiesService = createMock<CitiesService>();

  const mockCity: City = {
    _id: new Types.ObjectId,
    id: new Types.ObjectId,
    name: 'Singapore',
    code: 'SG'
  };

  const mockCreateCityDto: CreateCityDto = {
    name: 'Singapore',
    code: 'SG'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [
        {
          provide: CitiesService,
          useValue: mockCitiesService,
        }
      ],
    }).compile();

    controller = module.get<CitiesController>(CitiesController);
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
      mockCitiesService.create.mockRejectedValue(expectedError);
      await expect(controller.create(mockCreateCityDto)).rejects.toThrow(expectedError);
    });

    it ('should return the created city', async () => {
      mockCitiesService.create.mockResolvedValue(mockCity);
      const result = await controller.create(mockCreateCityDto);
      expect(result).toBe(mockCity);
    });
  });

  describe('search', () => {
    it('should be defined', () => {
      expect(controller.search).toBeDefined();
    });

    it ('should raise an error if the service call fails', async () => {
      const expectedError = new Error('service error');
      mockCitiesService.search.mockRejectedValue(expectedError);
      await expect(controller.search({ query: 'error-query' })).rejects.toThrow(expectedError);
    });

    it ('should return the matching cities', async () => {
      mockCitiesService.search.mockResolvedValue([mockCity]);
      const result = await controller.search({ query: 'Sloane' });
      expect(result).toStrictEqual([mockCity]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it ('should raise an error if the service call fails', async () => {
      const expectedError = new Error('service error');
      mockCitiesService.findOne.mockRejectedValue(expectedError);
      await expect(controller.findOne({ id: 'does-not-exist' })).rejects.toThrow(expectedError);
    });

    it ('should return the matching city', async () => {
      mockCitiesService.findOne.mockResolvedValue(mockCity);
      const result = await controller.findOne({ id: mockCity.id.toString() });
      expect(result).toBe(mockCity);
    });
  });
});
