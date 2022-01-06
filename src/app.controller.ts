import { Controller, Get, HttpStatus, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { BuildersService } from './builders/builders.service';
import { CitiesService } from './cities/cities.service';
import { SearchEntityQueryDto, SearchEntityResponseDto } from './common/dto/search-entity.dto';
import { IFacebookLoginRequestInterace } from './common/interfaces/facebook-login-request.interace';
import { ProjectsService } from './projects/projects.service';

@Controller()
export class AppController {
  constructor(
    private readonly citiesService: CitiesService,
    private readonly projectsService: ProjectsService,
    private readonly buildersService: BuildersService
    ) {}
  
  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: IFacebookLoginRequestInterace): Promise<any> {
    // call user service and create user here
    return {
      statusCode: HttpStatus.OK,
      data: req.user,
    };
  }

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
