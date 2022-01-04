import { Controller, Get, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { BuildersService } from './builders/builders.service';
import { Builder } from './builders/entities/builder.entity';
import { CitiesService } from './cities/cities.service';
import { City } from './cities/entities/city.entity';
import { SearchEntityQueryDto, SearchEntityResponseDto } from './common/dto/search-entity.dto';
import { Project } from './projects/entities/project.entity';
import { ProjectsService } from './projects/projects.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly citiesService: CitiesService,
    private readonly projectsService: ProjectsService,
    private readonly buildersService: BuildersService
    ) {}

  @Get('/searchall')
  @ApiOperation({ summary: 'Search entities' })
  @ApiOkResponse({ description: 'Result of entities matching the given query' })
  @ApiBody({ type: SearchEntityResponseDto })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async searchEntities(@Query() searchEntityQueryDto: SearchEntityQueryDto
    ): Promise<SearchEntityResponseDto> {
      const [cities, projects, builders] = await Promise.all([
        this.citiesService.search(searchEntityQueryDto),
        this.projectsService.search(searchEntityQueryDto),
        this.buildersService.search(searchEntityQueryDto)
      ])

      return {
        city: cities,
        project: projects,
        builder: builders
      }
  }
}
