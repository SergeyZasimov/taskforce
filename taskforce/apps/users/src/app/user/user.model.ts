import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { AvailableCities, User, UserRole } from '@taskforce/shared-types';
import { Cities } from 'libs/shared-types/src/lib/const';

export class UserModel implements User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
    enum: Cities,
  })
  city: AvailableCities;

  @Prop({
    required: true,
  })
  passwordHash: string;

  @Prop()
  avatar: string;

  @Prop({
    required: true,
  })
  birthday: Date;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Customer,
  })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
