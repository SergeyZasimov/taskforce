import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import * as dayjs from 'dayjs';

@ValidatorConstraint({ name: 'ExecutionTermError', async: false })
export class ExecutionTermValidator implements ValidatorConstraintInterface {
  validate(
    date: string,
    validationArguments?: ValidationArguments
  ): boolean | Promise<boolean> {
    return dayjs(date).diff(dayjs()) > 0;
  }
}
