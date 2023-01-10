import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Review, TaskStatus } from '@taskforce/shared-types';
import { isNotEmpty } from 'class-validator';
import { TaskRepository } from '../task/task.repository';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewEntity } from './review.entity';
import { ReviewRepository } from './review.repository';

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

    const existReview = await this.reviewRepository.findByTaskId(dto.taskId);

    if (existReview) {
      throw new BadRequestException('Для этого задания уже есть отзыв');
    }

    if (task.status !== TaskStatus.Complete) {
      throw new BadRequestException(
        'Нельзя оставить отзыв. Задача не выполнена'
      );
    }

    if (task.customerId !== customerId) {
      throw new ForbiddenException(
        'Нельзя оставить отзыв. Задача другого заказчика'
      );
    }

    if (task.contractorId !== dto.contractorId) {
      throw new BadRequestException(
        'Нельзя оставить отзыв. Исполнитель не выполнял задания'
      );
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

    if (index === -1) {
      return {
        rating: 0,
        ratingPlace: '-',
      };
    }

    return {
      rating: ratingSheet[index].rating,
      ratingPlace: index + 1,
    };
  }
}
