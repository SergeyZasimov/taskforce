import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from '@taskforce/shared-types';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewModel } from './review.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(ReviewModel.name)
    private readonly reviewModel: Model<ReviewModel>
  ) {}

  public async findByContractorId(id: string): Promise<Review[]> {
    return this.reviewModel.find({ contractorId: id }).populate('authorId');
  }

  public async create(dto: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(dto);
  }
}
