import {
  Controller,
  Get,
  Query,
  Headers,
  Body,
  Post,
  Delete,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ApiCommentQuery,
  BadRequestSchema,
  CommentNotFoundSchema,
  CommentSchema,
  COMMENT_API_OPERATION,
  COMMENT_RESPONSE_DESCRIPTION,
  CreateCommentSchema,
  ForbiddenSchema,
  TaskNotFoundSchema,
  TasksApiTag,
  UserUnauthorizedSchema,
} from '@taskforce/api-documentation';
import { RouteModule } from '@taskforce/shared-types';
import { AUTHORIZATION_FIELD } from '../app.constant';
import { CommentService } from './comment.service';

const { SHOW_ALL, CREATE, DELETE } = COMMENT_API_OPERATION;
const {
  TASK_NOT_FOUND,
  BAD_REQUEST,
  SHOW_ALL_OK,
  UNAUTHORIZED,
  CREATE_COMMENT,
  DELETE_COMMENT,
  COMMENT_NOT_FOUND,
  FOREIGN_COMMENT,
} = COMMENT_RESPONSE_DESCRIPTION;

@ApiTags(TasksApiTag.Comment)
@Controller(RouteModule.Comments)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ description: SHOW_ALL })
  @ApiBearerAuth()
  @ApiOkResponse({ description: SHOW_ALL_OK, type: [CommentSchema] })
  @ApiNotFoundResponse({
    description: TASK_NOT_FOUND,
    type: TaskNotFoundSchema,
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @Get('')
  public async showAllByTaskId(
    @Query() query: ApiCommentQuery,
    @Headers(AUTHORIZATION_FIELD) auth
  ) {
    return await this.commentService.getComments(query, auth);
  }

  @ApiOperation({ description: CREATE })
  @ApiBearerAuth()
  @ApiBody({ type: CreateCommentSchema })
  @ApiCreatedResponse({ description: CREATE_COMMENT, type: CommentSchema })
  @ApiNotFoundResponse({
    description: TASK_NOT_FOUND,
    type: TaskNotFoundSchema,
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @ApiUnauthorizedResponse({
    description: UNAUTHORIZED,
    type: UserUnauthorizedSchema,
  })
  @Post('')
  public async create(@Body() body, @Headers(AUTHORIZATION_FIELD) auth) {
    return await this.commentService.create(body, auth);
  }

  @ApiOperation({ description: DELETE })
  @ApiOkResponse({ description: DELETE_COMMENT })
  @ApiUnauthorizedResponse({
    description: UNAUTHORIZED,
    type: UserUnauthorizedSchema,
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @ApiNotFoundResponse({
    description: COMMENT_NOT_FOUND,
    type: CommentNotFoundSchema,
  })
  @ApiForbiddenResponse({ description: FOREIGN_COMMENT, type: ForbiddenSchema })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID комментария',
    example: '3',
  })
  @Delete(':id')
  public async delete(@Param('id') id, @Headers(AUTHORIZATION_FIELD) auth) {
    return await this.commentService.delete(id, auth);
  }
}
