import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchEntityDto } from 'src/common/dto/search-entity.dto';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { GetCityDto } from './dto/get-city.dto';
import { City } from './entities/city.entity';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  search(@Query() searchCityDto: SearchEntityDto): Promise<City[]> {
    return this.citiesService.search(searchCityDto);
  }

  @Get(':id')
  findOne(@Param() getCityDto: GetCityDto): Promise<City> {
    return this.citiesService.findOne(getCityDto);
  }
}
