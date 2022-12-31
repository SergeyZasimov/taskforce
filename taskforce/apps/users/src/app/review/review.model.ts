import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Review } from '@taskforce/shared-types';
import { Types, Document } from 'mongoose';
import { UserModel } from '../user/user.model';

@Schema({
  collection: 'reviews',
  timestamps: true,
})
export class ReviewModel extends Document implements Review {
  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: UserModel.name,
  })
  public authorId: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: UserModel.name,
  })
  public contractorId: string;

  @Prop({
    required: true,
  })
  public taskId: number;

  @Prop({
    required: true,
    minlength: 50,
    maxlength: 500,
  })
  public text: string;

  @Prop({
    required: true,
    min: 1,
    max: 5,
  })
  public rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
