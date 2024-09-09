import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;
  @Prop({ required: true })
  password: string;
  @Prop({ type: Types.ObjectId, ref: 'Role' })
  roles: Types.Array<Types.ObjectId>;
}

export const UserSchema = SchemaFactory.createForClass(User);
