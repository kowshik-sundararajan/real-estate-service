import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  
  const mockProjectsService = createMock<ProjectsService>();

  const mockProject: Project = {
    _id: new Types.ObjectId,
    id: new Types.ObjectId,
    name: 'Sloane Mansions'
  };

  const mockCreateProjectDto: CreateProjectDto = {
    name: 'Sloane Mansions'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: mockProjectsService,
        }
      ],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
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
      mockProjectsService.create.mockRejectedValue(expectedError);
      await expect(controller.create(mockCreateProjectDto)).rejects.toThrow(expectedError);
    });

    it ('should return the created project', async () => {
      mockProjectsService.create.mockResolvedValue(mockProject);
      const result = await controller.create(mockCreateProjectDto);
      expect(result).toBe(mockProject);
    });
  });

  describe('search', () => {
    it('should be defined', () => {
      expect(controller.search).toBeDefined();
    });

    it ('should raise an error if the service call fails', async () => {
      const expectedError = new Error('service error');
      mockProjectsService.search.mockRejectedValue(expectedError);
      await expect(controller.search({ query: 'error-query' })).rejects.toThrow(expectedError);
    });

    it ('should return the matching projects', async () => {
      mockProjectsService.search.mockResolvedValue([mockProject]);
      const result = await controller.search({ query: 'Sloane' });
      expect(result).toStrictEqual([mockProject]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(controller.findOne).toBeDefined();
    });

    it ('should raise an error if the service call fails', async () => {
      const expectedError = new Error('service error');
      mockProjectsService.findOne.mockRejectedValue(expectedError);
      await expect(controller.findOne({ id: 'does-not-exist' })).rejects.toThrow(expectedError);
    });

    it ('should return the matching project', async () => {
      mockProjectsService.findOne.mockResolvedValue(mockProject);
      const result = await controller.findOne({ id: mockProject.id.toString() });
      expect(result).toBe(mockProject);
    });
  });
});
