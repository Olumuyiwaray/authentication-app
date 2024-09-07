import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop({ required: true })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Role);
