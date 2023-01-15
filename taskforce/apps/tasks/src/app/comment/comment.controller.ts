import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {
  COMMENT_API_OPERATION,
  COMMENT_RESPONSE_DESCRIPTION,
} from './comment.constant';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentQuery } from './query/comment.query';
import { CommentRdo } from './rdo/comment.rdo';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import {
  ApiCommentQuery,
  BadRequestSchema,
  CommentNotFoundSchema,
  ForbiddenSchema,
  TaskNotFoundSchema,
  TasksApiTag,
  UserUnauthorizedSchema,
} from '@taskforce/api-documentation';
import { RouteModule } from '@taskforce/shared-types';

const { SHOW_ALL, CREATE, DELETE } = COMMENT_API_OPERATION;

const {
  SHOW_ALL_OK,
  TASK_NOT_FOUND,
  BAD_REQUEST,
  CREATE_COMMENT,
  UNAUTHORIZED,
  COMMENT_NOT_FOUND,
  FOREIGN_COMMENT,
  DELETE_COMMENT,
} = COMMENT_RESPONSE_DESCRIPTION;

@ApiTags(TasksApiTag.Comment)
@Controller(RouteModule.Comments)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ description: SHOW_ALL })
  @ApiResponse({
    status: HttpStatus.OK,
    description: SHOW_ALL_OK,
    type: [CommentRdo],
  })
  @ApiNotFoundResponse({
    description: TASK_NOT_FOUND,
    type: TaskNotFoundSchema,
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @ApiQuery({ type: ApiCommentQuery })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('')
  public async showAllByTaskId(@Query() { taskId, page }: CommentQuery) {
    const comments = await this.commentService.getComments(taskId, page);
    return fillObject(CommentRdo, comments);
  }

  @ApiOperation({ description: CREATE })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: CREATE_COMMENT,
    type: CommentRdo,
  })
  @ApiNotFoundResponse({
    description: TASK_NOT_FOUND,
    type: TaskNotFoundSchema,
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @ApiUnauthorizedResponse({
    description: UNAUTHORIZED,
    type: UserUnauthorizedSchema,
  })
  @UseGuards(JwtAuthGuard)
  @Post('')
  public async create(
    @Body() dto: CreateCommentDto,
    @GetCurrentUser('sub') userId: string
  ) {
    const newComment = await this.commentService.createComment(dto, userId);
    return fillObject(CommentRdo, newComment);
  }

  @ApiOperation({ description: DELETE })
  @ApiBearerAuth()
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
  @ApiParam({
    name: 'id',
    description: 'ID комментария',
    example: '3',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(
    @Param('id', DbIdValidationPipe) id: number,
    @GetCurrentUser('sub') userId: string
  ) {
    console.log(id);
    await this.commentService.deleteComment(id, userId);
  }
}
