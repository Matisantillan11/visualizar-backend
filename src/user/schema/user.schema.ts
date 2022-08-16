import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  public name: string;
  @Prop()
  public lastname: string;
  @Prop({
    unique: true,
    index: true,
    lowercase: true,
  })
  public email: string;
  @Prop({
    unique: true,
    index: true,
  })
  public dni: string;
  @Prop()
  public phone: string;
  @Prop()
  public address: string;
  @Prop({ default: 'Instituto Carlos Pellegrini' })
  public school: string;
  @Prop({ default: 'STUDENT' })
  public rol: string;
  @Prop({ default: '1A' })
  public course: string;
  @Prop({
    default: new Date(),
  })
  public creationDate: string;
  @Prop({
    default: new Date(),
  })
  public updateDate: string;
  @Prop({
    default: true,
  })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
