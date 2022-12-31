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

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public birthday: Date;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Customer,
    immutable: true,
  })
  public role: UserRole;

  @Prop({
    required: false,
    maxlength: 300,
  })
  public resume: string;

  @Prop({
    required: true,
  })
  public specialty: string[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
