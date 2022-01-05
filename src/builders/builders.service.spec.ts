import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MockMongoModel } from '../../test/mocks/mock-mongo-model';
import { BuildersService } from './builders.service';
import { Builder } from './entities/builder.entity';

describe('BuildersService', () => {
  let service: BuildersService;

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
});
