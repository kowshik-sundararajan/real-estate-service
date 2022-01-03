import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from "mongoose";
import { Builder } from "src/builders/entities/builder.entity";

export type UserDocument = User & Document;

export class User {
  @Prop({ required: true, index: 'text' })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Builder' })
  builder: Builder;
}

export const UserEntity = SchemaFactory.createForClass(User);

