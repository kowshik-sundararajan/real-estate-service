import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BuildersService } from './builders.service';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { GetBuilderDto } from './dto/get-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';
import { Builder } from './entities/builder.entity';

@Controller('builders')
export class BuildersController {
  constructor(private readonly buildersService: BuildersService) {}

  @Post()
  create(@Body() createBuilderDto: CreateBuilderDto): Promise<Builder> {
    return this.buildersService.create(createBuilderDto);
  }

  @Get()
  findAll() {
    return this.buildersService.findAll();
  }

  @Get(':id')
  findOne(@Param() getBuilderDto: GetBuilderDto): Promise<Builder> {
    return this.buildersService.findOne(getBuilderDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBuilderDto: UpdateBuilderDto) {
    return this.buildersService.update(+id, updateBuilderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.buildersService.remove(+id);
  }
}
