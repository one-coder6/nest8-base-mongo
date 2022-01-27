import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
  },
})
export class Demo extends Document {
  @Prop({})
  name: string;

  @Prop()
  sex: number;

  @Prop()
  age: number;

  @Prop()
  tags: string[];

  @Prop()
  remark: string;

  @Prop({ type: Object })
  myCar: object;

  @Prop()
  myCars: object[];
}
export const DemoSchema = SchemaFactory.createForClass(Demo);
