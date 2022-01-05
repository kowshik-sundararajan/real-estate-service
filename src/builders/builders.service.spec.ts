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
});
