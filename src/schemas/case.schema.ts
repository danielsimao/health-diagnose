import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CaseDocument = Case & Document;

@Schema()
export class Case {
  @Prop()
  ehr: string;
}

export const CaseSchema = SchemaFactory.createForClass(Case);
