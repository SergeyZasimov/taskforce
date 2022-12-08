import { Injectable } from '@nestjs/common';
import { Feedback } from '@taskforce/shared-types';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackEntity } from './feedback.entity';
import { FeedbackRepository } from './feedback.repository';

@Injectable()
export class FeedbackService {
  constructor(private readonly feedbackRepository: FeedbackRepository) {}

  public async getFeedbacksByTaskId(taskId: number): Promise<Feedback[]> {
    return await this.feedbackRepository.findByTaskId(taskId);
  }

  public async create(dto: CreateFeedbackDto): Promise<Feedback> {
    const newFeedbackEntity = new FeedbackEntity(dto);
    return await this.feedbackRepository.create(newFeedbackEntity);
  }
}
