import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { Document, Types } from "mongoose";

export type BuilderDocument = Builder & Document;

@Schema({
  toJSON: {
    virtuals: true
  }
})
export class Builder {
  _id: Types.ObjectId;

  @Expose()
  @ApiProperty({ type: 'string' })
  get id(): Types.ObjectId {
    return this._id;
  };

  @Prop({ required: true, index: 'text' })
  @ApiProperty({ type: 'string', example: 'Sloane constructions' })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ type: 'string', example: 'SGREG123' })
  registrationNumber: string;
}

export const BuilderEntity = SchemaFactory.createForClass(Builder);

