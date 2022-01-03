import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CityDocument = City & Document;

@Schema()
export class City {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  code: string;
}

export const CityEntity = SchemaFactory.createForClass(City);