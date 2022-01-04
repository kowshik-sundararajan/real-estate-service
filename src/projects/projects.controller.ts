import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { GetProjectDto } from './dto/get-project.dto';
import { Project } from './entities/project.entity';
import { SearchEntityDto } from 'src/common/dto/search-entity.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';

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
  @ApiOkResponse({ description: 'Result of projects matching the given query' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  search(@Query() searchProjectDto: SearchEntityDto): Promise<Project[]> {
    return this.projectsService.search(searchProjectDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Project matching the given id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findOne(@Param() getProjectDto: GetProjectDto): Promise<Project> {
    return this.projectsService.findOne(getProjectDto);
  }
}
