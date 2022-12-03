import { AvailableCities, User, UserRole } from '@taskforce/shared-types';
import { compare, hash } from 'bcrypt';
import {
  DEFAULT_AVATAR,
  DEFAULT_PASSWORD_HASH,
  SALT_ROUNDS,
} from './user.const';

export class UserEntity implements User {
  public _id: string;
  public name: string;
  public email: string;
  public passwordHash: string;
  public avatar: string;
  public city: AvailableCities;
  public role: UserRole;
  public birthday: Date;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject(): User {
    return { ...this };
  }

  public async comparePassword(password: string): Promise<boolean> {
    return await compare(password, this.passwordHash);
  }

  public async setPassword(password: string): Promise<UserEntity> {
    this.passwordHash = await hash(password, SALT_ROUNDS);
    return this;
  }

  private fillEntity(user: User): void {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.city = user.city;
    this.role = user.role;
    this.birthday = user.birthday;
    this.avatar = user.avatar || DEFAULT_AVATAR;
    this.passwordHash = user.passwordHash || DEFAULT_PASSWORD_HASH;
  }
}
