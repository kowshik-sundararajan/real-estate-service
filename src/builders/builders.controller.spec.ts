import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { BuildersController } from './builders.controller';
import { BuildersService } from './builders.service';
import { Builder } from './entities/builder.entity';
import { Types } from 'mongoose';
import { CreateBuilderDto } from './dto/create-builder.dto';

describe('BuildersController', () => {
  let controller: BuildersController;

  const mockBuildersService = createMock<BuildersService>();

  const mockBuilder: Builder = {
    _id: new Types.ObjectId,
    id: new Types.ObjectId,
    name: 'Sloane constructions',
    registrationNumber: 'SGREG123'
  };

  const mockCreateBuilderDto: CreateBuilderDto = {
    name: 'Sloane constructions',
    registrationNumber: 'SGREG123'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuildersController],
      providers: [
        {
          provide: BuildersService,
          useValue: mockBuildersService,
        }
      ],
    }).compile();

    controller = module.get<BuildersController>(BuildersController);
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
      mockBuildersService.create.mockRejectedValue(expectedError);
      await expect(controller.create(mockCreateBuilderDto)).rejects.toThrow(expectedError);
    });

    it ('should return the created builder', async () => {
      mockBuildersService.create.mockResolvedValue(mockBuilder);
      const result = await controller.create(mockCreateBuilderDto);
      expect(result).toBe(mockBuilder);
    });
  });

  describe('search', () => {
    it('should be defined', () => {
      expect(controller.search).toBeDefined();
    });

    it ('should raise an error if the service call fails', async () => {
      const expectedError = new Error('service error');
      mockBuildersService.search.mockRejectedValue(expectedError);
      await expect(controller.search({ query: 'error-query' })).rejects.toThrow(expectedError);
    });

    it ('should return the created builder', async () => {
      mockBuildersService.search.mockResolvedValue([mockBuilder]);
      const result = await controller.search({ query: 'Sloane' });
      expect(result).toStrictEqual([mockBuilder]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it ('should raise an error if the service call fails', async () => {
      const expectedError = new Error('service error');
      mockBuildersService.findOne.mockRejectedValue(expectedError);
      await expect(controller.findOne({ id: 'does-not-exist' })).rejects.toThrow(expectedError);
    });

    it ('should return the matching builder', async () => {
      mockBuildersService.findOne.mockResolvedValue(mockBuilder);
      const result = await controller.findOne({ id: mockBuilder.id.toString() });
      expect(result).toBe(mockBuilder);
    });
  });
});
