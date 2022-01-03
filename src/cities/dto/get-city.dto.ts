import { IsMongoId, IsNotEmpty } from 'class-validator'

export class GetCityDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}