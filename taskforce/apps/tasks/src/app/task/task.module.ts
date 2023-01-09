import { forwardRef, Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { ClientsModule } from '@nestjs/microservices';
import { RABBITMQ_SERVICE_NAME } from './task.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRabbitMqConfig } from '../../config/rabbitmq.config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from '../../config/jwt.config';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { FeedbackModule } from '../feedback/feedback.module';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from '../../config/multer.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE_NAME,
        useFactory: getRabbitMqConfig,
        inject: [ConfigService],
      },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
    MulterModule.registerAsync(getMulterConfig()),
    forwardRef(() => FeedbackModule),
  ],
  providers: [TaskService, TaskRepository, JwtStrategy],
  controllers: [TaskController],
  exports: [TaskRepository],
})
export class TaskModule {}
