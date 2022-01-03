import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { User } from "src/users/entities/user.entity";

export type BuilderDocument = Builder & Document;

export class Builder extends User {
  @Prop({ required: true })
  registrationNumber: string;
}

export const BuilderEntity = SchemaFactory.createForClass(Builder);

