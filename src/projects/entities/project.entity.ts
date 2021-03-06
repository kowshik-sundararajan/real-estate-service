import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Document, SchemaTypes, Types } from "mongoose";
import { Builder } from "../../builders/entities/builder.entity";
import { City } from "../../cities/entities/city.entity";

export type ProjectDocument = Project & Document;

@Schema({
  toJSON: {
    virtuals: true
  }
})
export class Project {
  _id: Types.ObjectId;

  @Expose()
  @ApiProperty({ type: 'string' })
  get id(): Types.ObjectId {
    return this._id;
  };

  @Prop({ required: true, index: 'text' })
  @ApiProperty({ type: 'string', example: 'Sloane Mansions' })
  name: string;

  @Prop()
  @ApiPropertyOptional({ type: 'number', example: 500_000 })
  priceMin?: number;

  @Prop()
  @ApiPropertyOptional({ type: 'number', example: 500_000 })
  priceMax?: number;

  @Prop()
  @ApiPropertyOptional({ type: 'date', example: new Date().toISOString() })
  startDate?: Date;

  @Prop()
  @ApiPropertyOptional({ type: 'date', example: new Date().toISOString() })
  endDate?: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'City' })
  @ApiPropertyOptional({ type: City })
  city?: City;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Builder' })
  @ApiPropertyOptional({ type: Builder })
  builder?: Builder;
}

export const ProjectEntity = SchemaFactory.createForClass(Project);
