import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import {
  BadRequestErrorRdo,
  ForbiddenErrorRdo,
  NotFoundErrorRdo,
  UnauthorizedErrorRdo,
} from '@taskforce/rdo';
import { UserRole } from '@taskforce/shared-types';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import { AssignContractorDto } from './dto/assign-contractor.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MyTasksQuery } from './query/my-tasks.query';
import { NotifyQuery } from './query/notify.query';
import { TaskQuery } from './query/task.query';
import { TaskRdo } from './rdo/task.rdo';
import {
  TASK_API_OPERATIONS,
  TASK_RESPONSE_DESCRIPTION,
} from './task.constant';
import { TaskService } from './task.service';

const {
  CHANGE_STATUS,
  ASSIGN_CONTRACTOR,
  MY_TASKS,
  SHOW,
  SHOW_ALL,
  CREATE,
  DELETE,
  UPDATE,
  NOTIFY,
} = TASK_API_OPERATIONS;

const {
  CHANGE_STATUS_OK,
  BAD_REQUEST,
  TASK_NOT_FOUND,
  FORBIDDEN_ROLE,
  UNAUTHORIZED,
  ASSIGN_CONTRACTOR_OK,
  MY_TASKS_OK,
  SHOW_OK,
  SHOW_ALL_OK,
  CREATED_OK,
  DELETED_OK,
  UPDATED_OK,
  NOTIFY_OK,
} = TASK_RESPONSE_DESCRIPTION;

@ApiTags('Задачи')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ description: CHANGE_STATUS })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: CHANGE_STATUS_OK,
    status: HttpStatus.OK,
    type: TaskRdo,
  })
  @ApiResponse({
    description: BAD_REQUEST,
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    description: TASK_NOT_FOUND,
    status: HttpStatus.NOT_FOUND,
    type: NotFoundErrorRdo,
  })
  @ApiResponse({
    description: UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedErrorRdo,
  })
  @ApiResponse({
    description: FORBIDDEN_ROLE,
    status: HttpStatus.FORBIDDEN,
    type: ForbiddenErrorRdo,
  })
  @UseGuards(JwtAuthGuard)
  @Patch('change-status')
  public async changeStatus(
    @Body() dto: ChangeStatusDto,
    @GetCurrentUser('role') role: UserRole
  ) {
    return fillObject(TaskRdo, this.taskService.changeStatus(dto, role));
  }

  @ApiOperation({ description: ASSIGN_CONTRACTOR })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: ASSIGN_CONTRACTOR_OK,
    status: HttpStatus.OK,
    type: TaskRdo,
  })
  @ApiResponse({
    description: BAD_REQUEST,
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    description: TASK_NOT_FOUND,
    status: HttpStatus.NOT_FOUND,
    type: NotFoundErrorRdo,
  })
  @ApiResponse({
    description: UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedErrorRdo,
  })
  @ApiResponse({
    description: FORBIDDEN_ROLE,
    status: HttpStatus.FORBIDDEN,
    type: ForbiddenErrorRdo,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Customer)
  @Patch('assign-contractor')
  public async assignContractor(
    @Body() dto: AssignContractorDto,
    @GetCurrentUser('sub') customerId: string
  ) {
    return await this.taskService.assignContractor(dto, customerId);
  }

  @ApiOperation({ description: MY_TASKS })
  @ApiBearerAuth()
  @ApiResponse({
    description: MY_TASKS_OK,
    status: HttpStatus.OK,
    type: [TaskRdo],
  })
  @ApiResponse({
    description: BAD_REQUEST,
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    description: UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedErrorRdo,
  })
  @UseGuards(JwtAuthGuard)
  @Get('my-tasks')
  public async getMyTasks(
    @GetCurrentUser('sub') userId: string,
    @GetCurrentUser('role') role: string,
    @Query() { status }: MyTasksQuery
  ) {
    const tasks = this.taskService.getMyTasks(userId, role, status);
    return fillObject(TaskRdo, tasks);
  }

  @ApiOperation({ description: NOTIFY })
  @ApiBearerAuth()
  @ApiResponse({
    description: NOTIFY_OK,
    status: HttpStatus.NO_CONTENT,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  @Get('notify')
  public async getNotify(
    @GetCurrentUser('email') email: string,
    @Query() { lastNotify }: NotifyQuery
  ) {
    await this.taskService.getNotify({ email, lastNotify });
  }

  @ApiOperation({ description: ASSIGN_CONTRACTOR })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: ASSIGN_CONTRACTOR_OK,
    status: HttpStatus.OK,
    type: TaskRdo,
  })
  @ApiResponse({
    description: BAD_REQUEST,
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    description: TASK_NOT_FOUND,
    status: HttpStatus.NOT_FOUND,
    type: NotFoundErrorRdo,
  })
  @ApiResponse({
    description: UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedErrorRdo,
  })
  @ApiResponse({
    description: FORBIDDEN_ROLE,
    status: HttpStatus.FORBIDDEN,
    type: ForbiddenErrorRdo,
  })
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Customer)
  @Post(':id/upload-image')
  public async uploadFile(
    @Param('id') id: number,
    @GetCurrentUser('sub') customerId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1_000_000 }),
          new FileTypeValidator({ fileType: /[\w/-]+.(jpg|png|jpeg)/ }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    const updatedTask = this.taskService.updateImage(id, customerId, {
      image: file.filename,
    });
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiOperation({ description: SHOW })
  @ApiResponse({
    status: HttpStatus.OK,
    description: SHOW_OK,
    type: TaskRdo,
  })
  @ApiResponse({
    description: BAD_REQUEST,
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    description: TASK_NOT_FOUND,
    status: HttpStatus.NOT_FOUND,
    type: NotFoundErrorRdo,
  })
  @ApiParam({
    name: 'id',
    description: 'ID задачи',
    example: '3',
  })
  @Get('/:id')
  public async show(@Param('id', DbIdValidationPipe) id: number) {
    const task = await this.taskService.getTask(id);
    return fillObject(TaskRdo, task);
  }

  @ApiOperation({ description: SHOW_ALL })
  @ApiResponse({
    status: HttpStatus.OK,
    description: SHOW_ALL_OK,
    type: [TaskRdo],
  })
  @Get('/')
  public async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getTasks(query);
    return fillObject(TaskRdo, tasks);
  }

  @ApiOperation({ description: CREATE })
  @ApiBearerAuth()
  @ApiResponse({
    description: CREATED_OK,
    status: HttpStatus.CREATED,
    type: TaskRdo,
  })
  @ApiResponse({
    description: BAD_REQUEST,
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    description: UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedErrorRdo,
  })
  @ApiResponse({
    description: FORBIDDEN_ROLE,
    status: HttpStatus.FORBIDDEN,
    type: ForbiddenErrorRdo,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Customer)
  @Post('/')
  public async create(
    @Body() dto: CreateTaskDto,
    @GetCurrentUser('sub') customerId: string
  ) {
    const newTask = await this.taskService.createTask(customerId, dto);
    return fillObject(TaskRdo, newTask);
  }

  @ApiOperation({ description: UPDATE })
  @ApiBearerAuth()
  @ApiResponse({
    description: UPDATED_OK,
    status: HttpStatus.OK,
    type: TaskRdo,
  })
  @ApiResponse({
    description: BAD_REQUEST,
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    description: TASK_NOT_FOUND,
    status: HttpStatus.NOT_FOUND,
    type: NotFoundErrorRdo,
  })
  @ApiResponse({
    description: UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedErrorRdo,
  })
  @ApiResponse({
    description: FORBIDDEN_ROLE,
    status: HttpStatus.FORBIDDEN,
    type: ForbiddenErrorRdo,
  })
  @ApiParam({
    name: 'id',
    description: 'ID задачи',
    example: '3',
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Customer)
  @Patch('/:id')
  public async update(
    @Param('id', DbIdValidationPipe) id: number,
    @Body() dto: UpdateTaskDto,
    @GetCurrentUser('sub') customerId: string
  ) {
    const updatedTask = await this.taskService.updateTask(id, dto, customerId);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiOperation({ description: DELETE })
  @ApiBearerAuth()
  @ApiResponse({
    description: DELETED_OK,
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    description: BAD_REQUEST,
    status: HttpStatus.BAD_REQUEST,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    description: TASK_NOT_FOUND,
    status: HttpStatus.NOT_FOUND,
    type: NotFoundErrorRdo,
  })
  @ApiResponse({
    description: UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
    type: UnauthorizedErrorRdo,
  })
  @ApiResponse({
    description: FORBIDDEN_ROLE,
    status: HttpStatus.FORBIDDEN,
    type: ForbiddenErrorRdo,
  })
  @ApiParam({
    name: 'id',
    description: 'ID задачи',
    example: '3',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Customer)
  @Delete('/:id')
  public async delete(
    @Param('id', DbIdValidationPipe) id: number,
    @GetCurrentUser('sub') customerId: string
  ) {
    await this.taskService.deleteTask(id, customerId);
  }
}
