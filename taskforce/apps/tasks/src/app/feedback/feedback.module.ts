import { Module } from '@nestjs/common';
import { FeedbackRepository } from './feedback.repository';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';

@Module({
  providers: [FeedbackService, FeedbackRepository],
  controllers: [FeedbackController],
})
export class FeedbackModule {}
