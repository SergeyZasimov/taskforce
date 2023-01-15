import { IsEmail } from 'class-validator';
import { EMAIL_REQUIRED } from '../email-subscriber.constant';

export class GetSubscriberDto {
  @IsEmail({}, { message: EMAIL_REQUIRED })
  public email: string;
}
