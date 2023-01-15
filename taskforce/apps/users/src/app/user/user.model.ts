import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { AvailableCities, User, UserRole } from '@taskforce/shared-types';
import { Cities } from 'libs/shared-types/src/lib/const';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class UserModel extends Document implements User {
  @Prop({
    required: true,
    minlength: 3,
    maxlength: 50,
  })
  public name: string;

  @Prop({
    required: true,
    unique: true,
    immutable: true,
  })
  public email: string;

  @Prop({
    required: true,
    type: String,
    enum: Cities,
  })
  public city: AvailableCities;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    default: '',
    match: [/[\w/-]+.(jpg|png|jpeg)/],
  })
  public avatar: string;

  @Prop({
    required: true,
  })
  public birthday: Date;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    immutable: true,
  })
  public role: UserRole;

  @Prop({
    required: false,
    maxlength: 300,
    default: '',
  })
  public resume: string;

  @Prop({
    required: false,
    default: [],
  })
  public specialty: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
