import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Feedback, TaskStatus } from '@taskforce/shared-types';
import { TaskRepository } from '../task/task.repository';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FeedbackEntity } from './feedback.entity';
import { FeedbackRepository } from './feedback.repository';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly taskRepository: TaskRepository
  ) {}

  public async getFeedbacksByTaskId(taskId: number): Promise<Feedback[]> {
    return await this.feedbackRepository.findByTaskId(taskId);
  }

  public async create(dto: CreateFeedbackDto): Promise<Feedback> {
    const existTask = await this.taskRepository.findById(dto.taskId);
    if (existTask.status !== TaskStatus.New) {
      throw new BadRequestException(
        'Отклик можно оставлять только к задаче со статусом "Новое"'
      );
    }
    const newFeedbackEntity = new FeedbackEntity(dto);
    return await this.feedbackRepository.create(newFeedbackEntity);
  }
}
