import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Feedback, TaskStatus } from '@taskforce/shared-types';
import { TaskRepository } from '../task/task.repository';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { FEEDBACK_EXCEPTION_MESSAGE } from './feedback.constant';
import { FeedbackEntity } from './feedback.entity';
import { FeedbackRepository } from './feedback.repository';

const { TASK_NOT_FOUND, TASK_STATUS_NOT_VALID, FEEDBACK_EXIST } =
  FEEDBACK_EXCEPTION_MESSAGE;

@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly taskRepository: TaskRepository
  ) {}

  public async getFeedbacksByTaskId(taskId: number): Promise<Feedback[]> {
    const existTask = await this.taskRepository.findById(taskId);
    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    return await this.feedbackRepository.findByTaskId(taskId);
  }

  public async create(
    dto: CreateFeedbackDto,
    contractorId: string
  ): Promise<Feedback> {
    const existTask = await this.taskRepository.findById(dto.taskId);
    if (!existTask) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }
    if (existTask.status !== TaskStatus.New) {
      throw new BadRequestException(TASK_STATUS_NOT_VALID);
    }
    const existFeedback = await this.feedbackRepository.findByTaskAndContractor(
      dto.taskId,
      contractorId
    );
    console.log(existFeedback);
    if (existFeedback) {
      throw new BadRequestException(FEEDBACK_EXIST);
    }
    const newFeedbackEntity = new FeedbackEntity({ ...dto, contractorId });
    return await this.feedbackRepository.create(newFeedbackEntity);
  }
}
