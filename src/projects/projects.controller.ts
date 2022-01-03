import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { GetProjectDto } from './dto/get-project.dto';
import { Project } from './entities/project.entity';
import { SearchEntityDto } from 'src/common/dto/search-entity.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  search(@Query() searchProjectDto: SearchEntityDto): Promise<Project[]> {
    return this.projectsService.search(searchProjectDto);
  }

  @Get(':id')
  findOne(@Param() getProjectDto: GetProjectDto): Promise<Project> {
    return this.projectsService.findOne(getProjectDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
