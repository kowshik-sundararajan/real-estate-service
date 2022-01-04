import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { SearchEntityQueryDto } from 'src/common/dto/search-entity.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  search(searchUserDto: SearchEntityQueryDto): Promise<User[]> {
    const filters: FilterQuery<UserDocument> = {};

    if (searchUserDto.query) {
      filters.$text = { $search: searchUserDto.query }
    }
    return this.userModel.find(filters).exec();
  }

  findOne(getUserDto: GetUserDto): Promise<User> {
    return this.userModel.findById(getUserDto.id).exec();
  }
}
