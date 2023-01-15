import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TaskModule } from '../task/task.module';
import { ReviewRepository } from './review.repository';

@Module({
  imports: [TaskModule],
  providers: [ReviewService, ReviewRepository],
  controllers: [ReviewController],
})
export class ReviewModule {}
