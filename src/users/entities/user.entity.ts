import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Document, SchemaTypes } from "mongoose";
import { Builder } from "../../builders/entities/builder.entity";

export type UserDocument = User & Document;

export class User {
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

