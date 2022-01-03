import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

export class User {
  @Prop({ required: true, index: 'text' })
  name: string;

  @Prop({ required: true })
  email: string;
}

export const UserEntity = SchemaFactory.createForClass(User);

