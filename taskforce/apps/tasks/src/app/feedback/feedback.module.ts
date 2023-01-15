import { forwardRef, Module } from '@nestjs/common';
import { FeedbackRepository } from './feedback.repository';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [forwardRef(() => TaskModule)],
  providers: [FeedbackService, FeedbackRepository],
  controllers: [FeedbackController],
  exports: [FeedbackRepository],
})
export class FeedbackModule {}
