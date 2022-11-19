import { AvailableCities, User, UserRole } from '@taskforce/shared-types';
import { compare, hash } from 'bcrypt';
import { SALT_ROUNDS } from './user.const';

export class UserEntity implements User {
  public id: number;
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

  public toObject() {
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
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.avatar = user.avatar;
    this.city = user.city;
    this.role = user.role;
    this.birthday = user.birthday;
  }
}
