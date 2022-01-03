import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SearchEntityDto } from 'src/common/dto/search-entity.dto';
import { BuildersService } from './builders.service';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { GetBuilderDto } from './dto/get-builder.dto';
import { Builder } from './entities/builder.entity';

@Controller('builders')
export class BuildersController {
  constructor(private readonly buildersService: BuildersService) {}

  @Post()
  create(@Body() createBuilderDto: CreateBuilderDto): Promise<Builder> {
    return this.buildersService.create(createBuilderDto);
  }

  @Get()
  search(@Query() searchBuilderDto: SearchEntityDto): Promise<Builder[]> {
    return this.buildersService.search(searchBuilderDto);
  }

  @Get(':id')
  findOne(@Param() getBuilderDto: GetBuilderDto): Promise<Builder> {
    return this.buildersService.findOne(getBuilderDto);
  }
}
