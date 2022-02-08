import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  },
})
export class GuestLog extends Document {
  @Prop()
  ip: string;
  @Prop()
  ua: string;
}
export const GuestLogSchema = SchemaFactory.createForClass(GuestLog);
