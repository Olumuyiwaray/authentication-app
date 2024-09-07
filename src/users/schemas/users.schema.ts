import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ type: Types.ObjectId, ref: 'Role' })
  roles: Types.ObjectId[];
}

export const AdminSchema = SchemaFactory.createForClass(User);
