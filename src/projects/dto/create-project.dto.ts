import { IsDate, IsNumber, IsString, IsNotEmpty, Max, Min, IsMongoId, IsOptional } from 'class-validator';
import { Builder } from 'src/builders/entities/builder.entity';
import { City } from 'src/cities/entities/city.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  priceMin: number;

  @IsNumber()
  @Max(Number.MAX_VALUE)
  @IsOptional()
  priceMax: number;

  @IsDate()
  @IsOptional()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;

  @IsMongoId()
  @IsOptional()
  builder: Builder;

  @IsMongoId()
  @IsOptional()
  city: City;
}
