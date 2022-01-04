import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, IsNotEmpty, Max, Min, IsMongoId, IsOptional, IsISO8601 } from 'class-validator';
import { Builder } from 'src/builders/entities/builder.entity';
import { City } from 'src/cities/entities/city.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', required: true, example: 'Sloane Mansions' })
  name: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiProperty({ type: 'number', example: 500_000 })
  priceMin: number;

  @IsNumber()
  @Max(Number.MAX_VALUE)
  @IsOptional()
  @ApiProperty({ type: 'number', example: 500_000 })
  priceMax: number;

  @IsISO8601()
  @IsOptional()
  @ApiProperty({ type: 'string', example: new Date().toISOString() })
  startDate: string;

  @IsISO8601()
  @IsOptional()
  @ApiProperty({ type: 'string', example: new Date().toISOString() })
  endDate: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({ type: Builder })
  builder: Builder;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({ type: City })
  city: City;
}
