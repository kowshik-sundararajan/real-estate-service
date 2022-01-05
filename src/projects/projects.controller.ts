import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectDto } from './dto/get-project.dto';
import { Project } from './entities/project.entity';
import { SearchEntityQueryDto } from '../common/dto/search-entity.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create project' })
  @ApiBody({ type: CreateProjectDto })
  @ApiCreatedResponse({ description: 'Project is created', type: Project })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search projects' })
  @ApiBody({ type: [Project] })
  @ApiOkResponse({ description: 'Result of projects matching the given query' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  search(@Query() searchProjectDto: SearchEntityQueryDto): Promise<Project[]> {
    return this.projectsService.search(searchProjectDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: Project })
  @ApiOkResponse({ description: 'Project matching the given id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findOne(@Param() getProjectDto: GetProjectDto): Promise<Project> {
    return this.projectsService.findOne(getProjectDto);
  }
}
