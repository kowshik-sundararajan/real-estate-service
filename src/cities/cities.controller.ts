import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SearchEntityQueryDto } from '../common/dto/search-entity.dto';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { GetCityDto } from './dto/get-city.dto';
import { City } from './entities/city.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @ApiOperation({ summary: 'Create city' })
  @ApiBody({ type: CreateCityDto })
  @ApiCreatedResponse({ description: 'City is created', type: City })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search cities' })
  @ApiBody({ type: [City] })
  @ApiOkResponse({ description: 'Result of cities matching the given query' })
  search(@Query() searchCityDto: SearchEntityQueryDto): Promise<City[]> {
    return this.citiesService.search(searchCityDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get city by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: City })
  @ApiOkResponse({ description: 'City matching the given id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findOne(@Param() getCityDto: GetCityDto): Promise<City> {
    return this.citiesService.findOne(getCityDto);
  }
}
