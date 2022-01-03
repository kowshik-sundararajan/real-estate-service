import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { Builder } from "src/builders/entities/builder.entity";
import { City } from "src/cities/entities/city.entity";

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true, index: 'text' })
  name: string;

  @Prop()
  priceMin: number;

  @Prop()
  priceMax: number;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'City' })
  city: City;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Builder' })
  builder: Builder;
}

export const ProjectEntity = SchemaFactory.createForClass(Project);
