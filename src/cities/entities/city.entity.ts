import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Document, Types } from "mongoose";

export type CityDocument = City & Document;

@Schema({
  toJSON: {
    virtuals: true
  }
})
export class City {
  _id: Types.ObjectId;

  @Expose()
  @ApiProperty({ type: 'string' })
  get id(): Types.ObjectId {
    return this._id;
  };

  @Prop({ required: true, index: 'text' })
  @ApiProperty({ type: 'string', example: 'Singapore' })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ type: 'string', example: 'SG' })
  code: string;
}

export const CityEntity = SchemaFactory.createForClass(City);