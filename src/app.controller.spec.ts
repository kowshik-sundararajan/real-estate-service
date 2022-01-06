import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { AppController } from './app.controller';
import { BuildersService } from './builders/builders.service';
import { Builder } from './builders/entities/builder.entity';
import { CitiesService } from './cities/cities.service';
import { City } from './cities/entities/city.entity';
import { Project } from './projects/entities/project.entity';
import { ProjectsService } from './projects/projects.service';

describe('AppController', () => {
  let controller: AppController;

  const mockBuildersService = createMock<BuildersService>();
  const mockCitiesService = createMock<CitiesService>();
  const mockProjectsService = createMock<ProjectsService>();

  const mockProject: Project = {
    _id: new Types.ObjectId,
    id: new Types.ObjectId,
    name: 'Sloane Mansions'
  };

  const mockBuilder: Builder = {
    _id: new Types.ObjectId,
    id: new Types.ObjectId,
    name: 'Sloane constructions',
    registrationNumber: 'SGREG123'
  };

  const mockCity: City = {
    _id: new Types.ObjectId,
    id: new Types.ObjectId,
    name: 'Singapore',
    code: 'SG'
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
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

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchEntities', () => {
    it('should be defined', () => {
      expect(controller.searchEntities).toBeDefined();
    });

    it ('should raise an error if any of the service calls fail', async () => {
      const expectedError = new Error('service error');
      mockProjectsService.search.mockRejectedValue(expectedError);
      mockBuildersService.search.mockResolvedValue([mockBuilder]);
      mockCitiesService.search.mockResolvedValue([mockCity]);
      await expect(controller.searchEntities({ query: 'error-query' })).rejects.toThrow(expectedError);
    });

    it ('should return the matching entities', async () => {
      mockProjectsService.search.mockResolvedValue([mockProject]);
      mockBuildersService.search.mockResolvedValue([mockBuilder]);
      mockCitiesService.search.mockResolvedValue([mockCity]);
      const result = await controller.searchEntities({ query: 'valid-query' });
      expect(result).toStrictEqual({
        city: [mockCity],
        project: [mockProject],
        builder: [mockBuilder]
      });
    });
  });
});
