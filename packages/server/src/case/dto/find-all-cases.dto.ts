import { Schema } from 'mongoose';

export class FindAllCasesDto {
  unreviewed: boolean;
  userId: Schema.Types.ObjectId;
}
