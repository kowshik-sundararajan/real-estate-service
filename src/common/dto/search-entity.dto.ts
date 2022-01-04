import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Builder } from "src/builders/entities/builder.entity";
import { City } from "src/cities/entities/city.entity";
import { Project } from "src/projects/entities/project.entity";

export class SearchEntityQueryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: 'string', example: 'query' })
  query: string;
}

export class SearchEntityResponseDto {
  @ApiProperty({ type: [City] })
  city: City[];

  @ApiProperty({ type: [Project] })
  project: Project[];

  @ApiProperty({ type: [Builder] })
  builder: Builder[];
}