import { TaskStatus } from '@taskforce/shared-types';
import * as dayjs from 'dayjs';

export const TASK_DEFAULT = {
  PRICE: 0,
  EXECUTION_TERM: dayjs().toDate(),
  IMAGE: '',
  ADDRESS: '',
  TAGS: [],
  STATUS: TaskStatus.New,
};
