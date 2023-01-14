import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ApiReviewQuery,
  BadRequestSchema,
  ConflictSchema,
  CreateReviewSchema,
  ForbiddenSchema,
  ReviewSchema,
  REVIEW_API_OPERATION,
  REVIEW_RESPONSE_DESCRIPTION,
  TaskNotFoundSchema,
  TasksApiTag,
  UserUnauthorizedSchema,
} from '@taskforce/api-documentation';
import { RouteModule } from '@taskforce/shared-types';
import { AUTHORIZATION_FIELD } from '../app.constant';
import { ReviewService } from './review.service';

const { CREATE_REVIEW, CONTRACTOR_REVIEW } = REVIEW_API_OPERATION;
const {
  TASK_NOT_FOUND,
  UNAUTHORIZED,
  BAD_REQUEST,
  FORBIDDEN_ROLE,
  CONFLICT,
  CREATED,
  SHOW_ALL,
} = REVIEW_RESPONSE_DESCRIPTION;

@ApiTags(TasksApiTag.Review)
@Controller(RouteModule.Reviews)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ description: CREATE_REVIEW })
  @ApiBearerAuth()
  @ApiBody({ type: CreateReviewSchema })
  @ApiCreatedResponse({ description: CREATED, type: ReviewSchema })
  @ApiNotFoundResponse({
    description: TASK_NOT_FOUND,
    type: TaskNotFoundSchema,
  })
  @ApiUnauthorizedResponse({
    description: UNAUTHORIZED,
    type: UserUnauthorizedSchema,
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @ApiForbiddenResponse({ description: FORBIDDEN_ROLE, type: ForbiddenSchema })
  @ApiConflictResponse({ description: CONFLICT, type: ConflictSchema })
  @Post('')
  public async create(@Body() body, @Headers(AUTHORIZATION_FIELD) auth) {
    return await this.reviewService.create(body, auth);
  }

  @ApiOperation({ description: CONTRACTOR_REVIEW })
  @ApiQuery({ type: ApiReviewQuery })
  @ApiOkResponse({ description: SHOW_ALL, type: [ReviewSchema] })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @Get('')
  public async getReviews(@Query() query) {
    return await this.reviewService.getReviews(query);
  }
}
