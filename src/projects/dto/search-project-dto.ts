import { IsString, IsNotEmpty } from 'class-validator'

export class SearchProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}