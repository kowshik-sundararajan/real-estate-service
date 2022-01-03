import { IsDate, IsNumber, IsString, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(0)
  priceMin: number;

  @IsNumber()
  @Max(Number.MAX_VALUE)
  priceMax: number;

  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
