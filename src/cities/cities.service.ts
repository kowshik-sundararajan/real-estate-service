import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCityDto } from './dto/create-city.dto';
import { GetCityDto } from './dto/get-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City, CityDocument } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  create(createCityDto: CreateCityDto): Promise<City> {
    const createdCity = new this.cityModel(createCityDto);
    return createdCity.save();
  }

  findAll() {
    return `This action returns all cities`;
  }

  findOne(getCityDto: GetCityDto): Promise<City> {
    return this.cityModel.findById(getCityDto.id).exec();
  }

  update(id: number, updateCityDto: UpdateCityDto) {
    return `This action updates a #${id} city`;
  }

  remove(id: number) {
    return `This action removes a #${id} city`;
  }
}
