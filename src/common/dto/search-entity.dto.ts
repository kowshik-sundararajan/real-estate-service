import { IsNotEmpty, IsString } from "class-validator";

export class SearchEntityDto {
  @IsNotEmpty()
  @IsString()
  query: string;
}