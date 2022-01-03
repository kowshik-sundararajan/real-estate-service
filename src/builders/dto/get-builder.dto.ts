import { IsMongoId, IsNotEmpty } from 'class-validator'

export class GetBuilderDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}