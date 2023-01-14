import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewQuery } from './query/review.query';
import { RatingRdo } from './rdo/rating.rdo';
import { ReviewRdo } from './rdo/review.rdo';
import {
  REVIEW_API_OPERATION,
  REVIEW_RESPONSE_DESCRIPTION,
} from './review.constant';
import { ReviewService } from './review.service';

const { CONTRACTOR_REVIEW, CREATE_REVIEW, GET_RATING } = REVIEW_API_OPERATION;

const {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  TASK_NOT_FOUND,
  UNAUTHORIZED,
  SHOW_ALL,
  RATING,
} = REVIEW_RESPONSE_DESCRIPTION;

@ApiTags('Отзывы')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ description: CREATE_REVIEW })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATED,
    type: ReviewRdo,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TASK_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: CONFLICT,
  })
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

  @ApiResponse({
    status: HttpStatus.OK,
    description: SHOW_ALL,
    type: [ReviewRdo],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST,
  })
  @ApiOperation({ description: CONTRACTOR_REVIEW })
  @Get('')
  public async getByContractorId(@Query() { contractorId }: ReviewQuery) {
    const reviews = await this.reviewService.getByContractorId(contractorId);
    return fillObject(ReviewRdo, reviews);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: RATING,
    type: RatingRdo,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST,
  })
  @ApiOperation({ description: GET_RATING })
  @UseGuards(JwtAuthGuard)
  @Get('get-rating')
  public async getRating(@Query() { contractorId }: ReviewQuery) {
    const rating = await this.reviewService.getRating(contractorId);
    return fillObject(RatingRdo, rating);
  }
}
