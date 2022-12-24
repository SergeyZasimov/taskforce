import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Subscriber } from '@taskforce/shared-types';
import { Document } from 'mongoose';

@Schema({
  collection: 'email-subscribers',
  timestamps: true,
})
export class EmailSubscriberModel extends Document implements Subscriber {
  @Prop({ required: true, unique: true })
  public email: string;

  @Prop({ required: false })
  public lastDistribution?: Date;
}

export const EmailSubscriberSchema =
  SchemaFactory.createForClass(EmailSubscriberModel);
