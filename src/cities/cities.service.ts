import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { SearchEntityQueryDto } from '../common/dto/search-entity.dto';
import { CreateCityDto } from './dto/create-city.dto';
import { GetCityDto } from './dto/get-city.dto';
import { City, CityDocument } from './entities/city.entity';

@Injectable()
export class CitiesService {
  constructor(@InjectModel(City.name) private cityModel: Model<CityDocument>) {}

  create(createCityDto: CreateCityDto): Promise<City> {
    const createdCity = new this.cityModel(createCityDto);
    return createdCity.save();
  }

  search(searchCityDto: SearchEntityQueryDto): Promise<City[]> {
    const filters: FilterQuery<CityDocument> = {};

    if (searchCityDto.query) {
      filters.$text = { $search: searchCityDto.query }
    }
    return this.cityModel.find(filters).exec();
  }

  findOne(getCityDto: GetCityDto): Promise<City> {
    return this.cityModel.findById(getCityDto.id).exec();
  }
}
