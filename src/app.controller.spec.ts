import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BuildersService } from './builders/builders.service';
import { CitiesService } from './cities/cities.service';
import { ProjectsService } from './projects/projects.service';

describe('AppController', () => {
  let controller: AppController;

  const mockBuildersService = createMock<BuildersService>();
  const mockCitiesService = createMock<CitiesService>();
  const mockProjectsService = createMock<ProjectsService>();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: BuildersService,
          useValue: mockBuildersService,
        },
        {
          provide: CitiesService,
          useValue: mockCitiesService,
        },
        {
          provide: ProjectsService,
          useValue: mockProjectsService,
        }
      ],
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
