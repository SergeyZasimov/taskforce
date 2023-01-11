import { Module } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [TaskModule],
  providers: [CommentService, CommentRepository],
  controllers: [CommentController],
})
export class CommentModule {}
