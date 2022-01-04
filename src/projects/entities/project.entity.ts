import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Document, SchemaTypes } from "mongoose";
import { Builder } from "src/builders/entities/builder.entity";
import { City } from "src/cities/entities/city.entity";

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true, index: 'text' })
  @ApiProperty({ type: 'string', example: 'Sloane Mansions' })
  name: string;

  @Prop()
  @ApiPropertyOptional({ type: 'number', example: 500_000 })
  priceMin: number;

  @Prop()
  @ApiPropertyOptional({ type: 'number', example: 500_000 })
  priceMax: number;

  @Prop()
  @ApiPropertyOptional({ type: 'date', example: new Date().toISOString() })
  startDate: Date;

  @Prop()
  @ApiPropertyOptional({ type: 'date', example: new Date().toISOString() })
  endDate: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'City' })
  @ApiPropertyOptional({ type: City })
  city: City;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Builder' })
  @ApiPropertyOptional({ type: Builder })
  builder: Builder;
}

export const ProjectEntity = SchemaFactory.createForClass(Project);
