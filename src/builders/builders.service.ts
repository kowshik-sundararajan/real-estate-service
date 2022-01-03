import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBuilderDto } from './dto/create-builder.dto';
import { GetBuilderDto } from './dto/get-builder.dto';
import { UpdateBuilderDto } from './dto/update-builder.dto';
import { Builder, BuilderDocument } from './entities/builder.entity';

@Injectable()
export class BuildersService {
  constructor(@InjectModel(Builder.name) private builderModel: Model<BuilderDocument>) {}

  create(createBuilderDto: CreateBuilderDto): Promise<Builder> {
    const createdBuilder = new this.builderModel(createBuilderDto);
    return createdBuilder.save();
  }

  findAll() {
    return `This action returns all builders`;
  }

  findOne(getBuilderDto: GetBuilderDto): Promise<Builder> {
    return this.builderModel.findById(getBuilderDto.id).exec();
  }

  update(id: number, updateBuilderDto: UpdateBuilderDto) {
    return `This action updates a #${id} builder`;
  }

  remove(id: number) {
    return `This action removes a #${id} builder`;
  }
}
