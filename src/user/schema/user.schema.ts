import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  public name: string;
  public lastname: string;
  @Prop({
    unique: true,
    index: true,
  })
  public email: string;
  @Prop({
    unique: true,
    index: true,
  })
  public dni: string;
  public phone: string;
  public address: string;
  public school: string;
  public rol: string;
  public course: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
