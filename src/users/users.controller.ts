import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './entities/user.entity';
import { SearchEntityDto } from 'src/common/dto/search-entity.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  search(@Query() searchUserDto: SearchEntityDto): Promise<User[]> {
    return this.usersService.search(searchUserDto);
  }

  @Get(':id')
  findOne(@Param() getUserDto: GetUserDto): Promise<User> {
    return this.usersService.findOne(getUserDto);
  }
}
