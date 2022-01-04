import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString, IsNotEmpty, Max, Min, IsMongoId, IsOptional, IsISO8601 } from 'class-validator';
import { Builder } from 'src/builders/entities/builder.entity';
import { City } from 'src/cities/entities/city.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string', example: 'Sloane Mansions' })
  name: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  @ApiPropertyOptional({ type: 'number', example: 500_000 })
  priceMin: number;

  @IsNumber()
  @Max(Number.MAX_VALUE)
  @IsOptional()
  @ApiPropertyOptional({ type: 'number', example: 500_000 })
  priceMax: number;

  @IsISO8601()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string', example: new Date().toISOString() })
  startDate: string;

  @IsISO8601()
  @IsOptional()
  @ApiPropertyOptional({ type: 'string', example: new Date().toISOString() })
  endDate: string;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({ type: Builder })
  builder: Builder;

  @IsMongoId()
  @IsOptional()
  @ApiPropertyOptional({ type: City })
  city: City;
}
