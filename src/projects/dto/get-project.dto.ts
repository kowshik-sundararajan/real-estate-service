import { IsMongoId, IsNotEmpty } from 'class-validator'

export class GetProjectDto {
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}