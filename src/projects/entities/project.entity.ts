import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, SchemaTypes } from "mongoose";
import { Builder } from "src/builders/entities/builder.entity";
import { City } from "src/cities/entities/city.entity";

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true, index: 'text' })
  @ApiProperty({ type: 'string', required: true, example: 'Sloane Mansions' })
  name: string;

  @Prop()
  @ApiProperty({ type: 'number', example: 500_000 })
  priceMin: number;

  @Prop()
  @ApiProperty({ type: 'number', example: 500_000 })
  priceMax: number;

  @Prop()
  @ApiProperty({ type: 'date', example: new Date().toISOString() })
  startDate: Date;

  @Prop()
  @ApiProperty({ type: 'date', example: new Date().toISOString() })
  endDate: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'City' })
  @ApiProperty({ type: City })
  city: City;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Builder' })
  @ApiProperty({ type: Builder })
  builder: Builder;
}

export const ProjectEntity = SchemaFactory.createForClass(Project);
