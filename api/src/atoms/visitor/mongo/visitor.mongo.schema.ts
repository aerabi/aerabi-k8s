import { Visitor } from '../visitor.service';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type VisitorDocument = Visitor & Document;

@Schema()
export class VisitorMongoSchema {
  @Prop()
  name: string;

  @Prop()
  email: string;
}

export const visitorMongoSchema =
  SchemaFactory.createForClass(VisitorMongoSchema);
