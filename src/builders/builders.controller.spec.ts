import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { BuildersController } from './builders.controller';
import { BuildersService } from './builders.service';

describe('BuildersController', () => {
  let controller: BuildersController;

  const mockBuildersService = createMock<BuildersService>();

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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
