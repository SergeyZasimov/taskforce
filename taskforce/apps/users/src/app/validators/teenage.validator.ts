import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as dayjs from 'dayjs';

@ValidatorConstraint({ name: 'BirthdayError', async: false })
export class TeenageValidator implements ValidatorConstraintInterface {
  validate(birthday: string): boolean | Promise<boolean> {
    return dayjs().subtract(18, 'year') > dayjs(birthday);
  }
}
