import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { BuildersService } from './builders/builders.service';
import { Builder } from './builders/entities/builder.entity';
import { CitiesService } from './cities/cities.service';
import { City } from './cities/entities/city.entity';
import { SearchEntityDto } from './common/dto/search-entity.dto';
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

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/searchall')
  searchEntities(@Query() searchEntityDto: SearchEntityDto
    ): Promise<[City[], Project[], Builder[]]> {
      return Promise.all([
        this.citiesService.search(searchEntityDto),
        this.projectsService.search(searchEntityDto),
        this.buildersService.search(searchEntityDto)
      ])
  }
}
