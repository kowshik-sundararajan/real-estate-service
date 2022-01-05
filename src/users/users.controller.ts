import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User } from './entities/user.entity';
import { SearchEntityQueryDto } from '../common/dto/search-entity.dto';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'User is created', type: User })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Search users' })
  @ApiBody({ type: [User] })
  @ApiOkResponse({ description: 'Result of users matching the given query' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  search(@Query() searchUserDto: SearchEntityQueryDto): Promise<User[]> {
    return this.usersService.search(searchUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: User })
  @ApiOkResponse({ description: 'User matching the given id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  findOne(@Param() getUserDto: GetUserDto): Promise<User> {
    return this.usersService.findOne(getUserDto);
  }
}
