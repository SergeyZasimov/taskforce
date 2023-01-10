import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewQuery } from './query/review.query';
import { ReviewRdo } from './rdo/review.rdo';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Customer)
  @Post('')
  public async create(
    @Body() dto: CreateReviewDto,
    @GetCurrentUser('sub') customerId: string
  ) {
    const review = await this.reviewService.create(dto, customerId);
    return fillObject(ReviewRdo, review);
  }

  @Get('')
  public async getByContractorId(@Query() { contractorId }: ReviewQuery) {
    const reviews = await this.reviewService.getByContractorId(contractorId);
    return fillObject(ReviewRdo, reviews);
  }

  @Get('get-rating')
  public async getRating(@Query() { contractorId }: ReviewQuery) {
    const rating = await this.reviewService.getRating(contractorId);
    return rating;
  }
}
