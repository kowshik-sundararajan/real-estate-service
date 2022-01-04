import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SearchEntityDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', example: 'query' })
  query: string;
}