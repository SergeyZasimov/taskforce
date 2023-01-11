import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { Review, TaskStatus } from '@taskforce/shared-types';
import { TaskRepository } from '../task/task.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { REVIEW_EXCEPTION_MESSAGE } from './review.constant';
import { ReviewEntity } from './review.entity';
import { ReviewRepository } from './review.repository';

const {
  TASK_NOT_FOUND,
  CONFLICT_REVIEW,
  TASK_NOT_COMPLETE,
  FOREIGN_TASK,
  FOREIGN_CONTRACTOR,
} = REVIEW_EXCEPTION_MESSAGE;

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly taskRepository: TaskRepository
  ) {}

  public async create(
    dto: CreateReviewDto,
    customerId: string
  ): Promise<Review> {
    const task = await this.taskRepository.findById(dto.taskId);
    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    const existReview = await this.reviewRepository.findByTaskId(dto.taskId);

    if (existReview) {
      throw new ConflictException(CONFLICT_REVIEW);
    }

    if (task.status !== TaskStatus.Complete) {
      throw new BadRequestException(TASK_NOT_COMPLETE);
    }

    if (task.customerId !== customerId) {
      throw new ForbiddenException(FOREIGN_TASK);
    }

    if (task.contractorId !== dto.contractorId) {
      throw new BadRequestException(FOREIGN_CONTRACTOR);
    }

    const newReviewEntity = new ReviewEntity({ ...dto, customerId });
    return this.reviewRepository.create(newReviewEntity);
  }

  public async getByContractorId(contractorId: string): Promise<Review[]> {
    return this.reviewRepository.findByContractorId(contractorId);
  }

  public async getRating(contractorId: string) {
    const reviewSheet = await this.reviewRepository.findForRating();
    const failedSheet = await this.taskRepository.getFailedSheet();

    const ratingSheet = reviewSheet
      .map((item) => {
        const failedCount =
          failedSheet.find(
            (subject) => item.contractorId === subject.contractorId
          )?._count.id ?? 0;

        return {
          contractorId: item.contractorId,
          rating: +(
            item._sum.rating /
            (item._count.rating + failedCount)
          ).toFixed(1),
        };
      })
      .sort((a, b) => b.rating - a.rating);

    const index = ratingSheet.findIndex(
      (item) => item.contractorId === contractorId
    );

    return {
      rating: index !== -1 ? ratingSheet[index].rating : 0,
      ratingPlace: index !== -1 ? index + 1 : 0,
    };
  }
}
