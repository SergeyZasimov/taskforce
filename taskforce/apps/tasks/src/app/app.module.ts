import { Module } from '@nestjs/common';

import { TaskModule } from './task/task.module';
import { CrudModule } from './crud/crud.module';

@Module({
  imports: [TaskModule, CrudModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
