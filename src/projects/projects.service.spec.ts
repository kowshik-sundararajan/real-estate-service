import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MockMongoModel } from '../../test/mocks/mock-mongo-model';
import { Project } from './entities/project.entity';
import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  const mockProject = {
    name: 'Sloane Mansions'
  } as Project;

  const mockCreatedProject: { _id: string } = {
    _id: 's0mePr0jectId'
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        {
          provide: getModelToken(Project.name),
          useValue: MockMongoModel
        }
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
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
        .mockResolvedValueOnce(mockCreatedProject);

      const result = await service.create(mockProject as any);

      expect(mockMongoModelSaveSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCreatedProject);
    });
  });

  describe('search', () => {
    it('should be defined', () => {
      expect(service.search).toBeDefined();
    });

    it('should return an empty array when no projects are found', async () => {
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

    it ('should return an array of matching projects', async () => {
      const mockMongoModelFindSpy = jest
      .spyOn(MockMongoModel, 'find');
      const mockMongoModelExecSpy = jest
      .spyOn(MockMongoModel, 'exec')
      .mockResolvedValueOnce([mockCreatedProject]);

      const result = await service.search({ query: 'jon' });

      expect(mockMongoModelFindSpy).toHaveBeenCalledTimes(1);
      expect(mockMongoModelExecSpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual([mockCreatedProject]);
    });
  });

  describe('findOne', () => {
    it('should be defined', () => {
      expect(service.findOne).toBeDefined();
    });

    it('should return an empty object if the project is not found', async () => {
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

    it('should return the matching project', async () => {
      const mockMongoModelFindByIdSpy = jest
      .spyOn(MockMongoModel, 'findById');
      const mockMongoModelExecSpy = jest
        .spyOn(MockMongoModel, 'exec')
        .mockResolvedValueOnce(mockCreatedProject);

      const result = await service.findOne({ id: 's0mePr0jectId' });

      expect(mockMongoModelFindByIdSpy).toHaveBeenCalledTimes(1);
      expect(mockMongoModelExecSpy).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(mockCreatedProject);
    });
  });
});
