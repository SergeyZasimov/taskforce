import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [PrismaModule, CommentModule, FeedbackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
