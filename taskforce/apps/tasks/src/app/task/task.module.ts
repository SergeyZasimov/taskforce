import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE_NAME } from './task.constant';
import { getRabbitMqConfig } from '../congfig/rabbitmq.config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE_NAME,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
})
export class TaskModule {}
