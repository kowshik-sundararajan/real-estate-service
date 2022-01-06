import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Document, SchemaTypes, Types } from "mongoose";
import { Builder } from "../../builders/entities/builder.entity";

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    virtuals: true
  }
})
export class User {
  _id: Types.ObjectId;

  @Expose()
  @ApiProperty({ type: 'string' })
  get id(): Types.ObjectId {
    return this._id;
  };

  @Prop({ required: true, index: 'text' })
  @ApiProperty({ type: 'string', example: 'Jon Snow' })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ type: 'string', example: 'jon@snow.com' })
  email: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Builder' })
  @ApiPropertyOptional({ type: Builder })
  builder?: Builder;
}

export const UserEntity = SchemaFactory.createForClass(User);

