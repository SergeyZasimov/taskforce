import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewQuery } from './query/review.query';
import { ReviewRdo } from './rdo/review.rdo';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('create')
  public async create(@Body() dto: CreateReviewDto) {
    return this.reviewService.create(dto);
  }

  @Get('')
  public async showByContractorId(@Query() query: ReviewQuery) {
    const review = this.reviewService.findByContractorId(query.contractorId);
    return fillObject(ReviewRdo, review);
  }
}
