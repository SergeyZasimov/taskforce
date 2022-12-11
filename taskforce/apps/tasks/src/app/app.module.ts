import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { FeedbackModule } from './feedback/feedback.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [PrismaModule, CommentModule, FeedbackModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
