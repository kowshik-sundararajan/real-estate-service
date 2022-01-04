import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export type CityDocument = City & Document;

@Schema()
export class City {
  @Prop({ required: true, index: 'text' })
  @ApiProperty({ type: 'string', example: 'Singapore' })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ type: 'string', example: 'SG' })
  code: string;
}

export const CityEntity = SchemaFactory.createForClass(City);