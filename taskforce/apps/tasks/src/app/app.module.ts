import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { FeedbackModule } from './feedback/feedback.module';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import { rabbitMqOptions } from './congfig/rabbitmq.config';

@Module({
  imports: [
    PrismaModule,
    CommentModule,
    FeedbackModule,
    TaskModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [rabbitMqOptions],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
