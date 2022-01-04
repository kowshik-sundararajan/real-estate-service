import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document, SchemaTypes } from "mongoose";
import { Builder } from "src/builders/entities/builder.entity";

export type UserDocument = User & Document;

export class User {
  @Prop({ required: true, index: 'text' })
  @ApiProperty({ type: 'string', required: true, example: 'Jon Snow' })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ type: 'string', required: true, example: 'jon@snow.com' })
  email: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Builder' })
  @ApiProperty({ type: Builder })
  builder: Builder;
}

export const UserEntity = SchemaFactory.createForClass(User);

