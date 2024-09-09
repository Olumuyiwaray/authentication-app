import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoleDocument = HydratedDocument<Role>;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true, enum: ['admin', 'student', 'CRM'] })
  role: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
