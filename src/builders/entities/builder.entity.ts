import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type BuilderDocument = Builder & Document;

export class Builder {
  @Prop({ required: true, index: 'text' })
  name: string;

  @Prop({ required: true })
  registrationNumber: string;
}

export const BuilderEntity = SchemaFactory.createForClass(Builder);

