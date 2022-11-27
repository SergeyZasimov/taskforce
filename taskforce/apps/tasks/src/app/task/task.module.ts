import { Module } from '@nestjs/common';
import { TaskMemoryRepository } from './task.memory.repository';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  providers: [TaskMemoryRepository, TaskService],
  exports: [TaskMemoryRepository],
  controllers: [TaskController],
})
export class TaskModule {}
