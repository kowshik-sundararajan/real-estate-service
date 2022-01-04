import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { SearchEntityQueryDto } from 'src/common/dto/search-entity.dto';
import { BuildersService } from './builders.service';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { GetBuilderDto } from './dto/get-builder.dto';
import { Builder } from './entities/builder.entity';

@Controller('builders')
export class BuildersController {
  constructor(private readonly buildersService: BuildersService) {}

  @Post()
  @ApiOperation({ summary: 'Create builder' })
  @ApiBody({ type: CreateBuilderDto })
  @ApiCreatedResponse({ description: 'Builder is created', type: Builder })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(@Body() createBuilderDto: CreateBuilderDto): Promise<Builder> {
    return this.buildersService.create(createBuilderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search builders' })
  @ApiOkResponse({ description: 'Result of builders matching the given query' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  search(@Query() searchBuilderDto: SearchEntityQueryDto): Promise<Builder[]> {
    return this.buildersService.search(searchBuilderDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get builder by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiOkResponse({ description: 'Builder matching the given id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findOne(@Param() getBuilderDto: GetBuilderDto): Promise<Builder> {
    return this.buildersService.findOne(getBuilderDto);
  }
}
