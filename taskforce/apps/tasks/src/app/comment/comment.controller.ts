import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
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

@ApiTags('Комментарии')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ description: SHOW_ALL })
  @ApiResponse({
    status: HttpStatus.OK,
    description: SHOW_ALL_OK,
    type: [CommentRdo],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TASK_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST,
  })
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
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: TASK_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BAD_REQUEST,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED,
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
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: DELETE_COMMENT,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: UNAUTHORIZED,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: COMMENT_NOT_FOUND,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: FOREIGN_COMMENT,
  })
  @ApiParam({
    name: 'id',
    description: 'ID комментария',
    example: '3',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(
    @Param('id', DbIdValidationPipe) id: number,
    @GetCurrentUser('sub') userId: string
  ) {
    await this.commentService.deleteComment(id, userId);
  }
}
