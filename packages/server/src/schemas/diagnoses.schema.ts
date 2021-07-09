import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';

export type DiagnosesDocument = Diagnoses & Document;

@Schema()
export class Diagnoses {
  @Prop({ type: MSchema.Types.ObjectId, ref: 'Case' })
  caseId: MSchema.Types.ObjectId;

  @Prop({ type: MSchema.Types.ObjectId, ref: 'User' })
  userId: MSchema.Types.ObjectId;

  @Prop()
  label: string;

  @Prop()
  duration: number;
}

export const DiagnosesSchema = SchemaFactory.createForClass(Diagnoses);
