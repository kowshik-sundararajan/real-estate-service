import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Document } from "mongoose";

export type BuilderDocument = Builder & Document;

export class Builder {
  @Prop({ required: true, index: 'text' })
  @ApiProperty({ type: 'string', example: 'Sloane constructions' })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ type: 'string', example: 'SGREG123' })
  registrationNumber: string;
}

export const BuilderEntity = SchemaFactory.createForClass(Builder);

