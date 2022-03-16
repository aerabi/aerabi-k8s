import { Visitor } from './visitor.service';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type VisitorDocument = Visitor & Document;

@Schema()
export class VisitorSchema {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

export const visitorSchema = SchemaFactory.createForClass(VisitorSchema);
