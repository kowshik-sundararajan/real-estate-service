import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CityEntity } from './entities/city.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: City.name, schema: CityEntity }])],
  controllers: [CitiesController],
  providers: [CitiesService],
  exports: [CitiesService]
})
export class CitiesModule {}
