import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { SearchEntityQueryDto } from '../common/dto/search-entity.dto';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { GetBuilderDto } from './dto/get-builder.dto';
import { Builder, BuilderDocument } from './entities/builder.entity';

@Injectable()
export class BuildersService {
  constructor(@InjectModel(Builder.name) private builderModel: Model<BuilderDocument>) {}

  create(createBuilderDto: CreateBuilderDto): Promise<Builder> {
    const createdBuilder = new this.builderModel(createBuilderDto);
    return createdBuilder.save();
  }

  search(searchBuilderDto: SearchEntityQueryDto): Promise<Builder[]> {
    const filters: FilterQuery<BuilderDocument> = {};

    if (searchBuilderDto.query) {
      filters.$text = { $search: searchBuilderDto.query }
    }
    return this.builderModel.find(filters).exec();
  }

  findOne(getBuilderDto: GetBuilderDto): Promise<Builder> {
    return this.builderModel.findById(getBuilderDto.id).exec();
  }
}
