import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop()
  public title: string;
  @Prop()
  public description: string;

  @Prop()
  public author: string;

  @Prop()
  public editorial: string;

  @Prop()
  public published_at: string;

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

export const BookSchema = SchemaFactory.createForClass(Book);
