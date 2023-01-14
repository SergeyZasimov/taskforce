import { Body, Controller, Get, Headers, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ApiFeedbackQuery,
  BadRequestSchema,
  CreateFeedbackSchema,
  FeedbackSchema,
  FEEDBACK_API_OPERATION,
  FEEDBACK_RESPONSE_DESCRIPTION,
  ForbiddenSchema,
  TaskNotFoundSchema,
  TasksApiTag,
  UserUnauthorizedSchema,
} from '@taskforce/api-documentation';
import { RouteModule } from '@taskforce/shared-types';
import { AUTHORIZATION_FIELD } from '../app.constant';
import { FeedbackService } from './feedback.service';

const { SHOW_ALL, CREATE } = FEEDBACK_API_OPERATION;
const {
  TASK_NOT_FOUND,
  BAD_REQUEST,
  UNAUTHORIZED,
  SHOW_ALL_OK,
  CREATED,
  FORBIDDEN_ROLE,
} = FEEDBACK_RESPONSE_DESCRIPTION;

@ApiTags(TasksApiTag.Feedback)
@Controller(RouteModule.Feedbacks)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @ApiOperation({ description: SHOW_ALL })
  @ApiOkResponse({ description: SHOW_ALL_OK, type: [FeedbackSchema] })
  @ApiNotFoundResponse({
    description: TASK_NOT_FOUND,
    type: TaskNotFoundSchema,
  })
  @ApiUnauthorizedResponse({
    description: UNAUTHORIZED,
    type: UserUnauthorizedSchema,
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @ApiBearerAuth()
  @Get('')
  public async index(
    @Query() query: ApiFeedbackQuery,
    @Headers(AUTHORIZATION_FIELD) auth
  ) {
    return await this.feedbackService.getFeedbacks(query, auth);
  }

  @ApiOperation({ description: CREATE })
  @ApiBearerAuth()
  @ApiBody({ type: CreateFeedbackSchema })
  @ApiCreatedResponse({ description: CREATED, type: FeedbackSchema })
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
  @Post('/')
  public async create(@Body() body, @Headers(AUTHORIZATION_FIELD) auth) {
    return await this.feedbackService.create(body, auth);
  }
}
