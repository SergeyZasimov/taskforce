import {
  Body,
  Controller,
  Patch,
  Headers,
  Get,
  Query,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Route, RouteModule } from '@taskforce/shared-types';
import { TaskService } from './task.service';
import {
  ApiMyTasksQuery,
  ApiTaskQuery,
  AssignContractorSchema,
  BadRequestSchema,
  ChangeStatusSchema,
  CreateTaskSchema,
  ForbiddenSchema,
  TaskNotFoundSchema,
  TasksApiTag,
  TaskSchema,
  TASK_API_OPERATIONS,
  TASK_RESPONSE_DESCRIPTION,
  UpdateTaskSchema,
  UserUnauthorizedSchema,
} from '@taskforce/api-documentation';
import { AUTHORIZATION_FIELD } from '../app.constant';

const {
  CHANGE_STATUS,
  ASSIGN_CONTRACTOR,
  MY_TASKS,
  NOTIFY,
  SHOW,
  CREATE,
  DELETE,
  SHOW_ALL,
  UPDATE,
} = TASK_API_OPERATIONS;
const {
  TASK_NOT_FOUND,
  UNAUTHORIZED,
  BAD_REQUEST,
  FORBIDDEN_ROLE,
  CHANGE_STATUS_OK,
  ASSIGN_CONTRACTOR_OK,
  MY_TASKS_OK,
  NOTIFY_OK,
  SHOW_OK,
  CREATED_OK,
  DELETED_OK,
  SHOW_ALL_OK,
  UPDATED_OK,
} = TASK_RESPONSE_DESCRIPTION;

@ApiTags(TasksApiTag.Task)
@Controller(RouteModule.Tasks)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ description: CHANGE_STATUS })
  @ApiBearerAuth()
  @ApiBody({ type: ChangeStatusSchema })
  @ApiOkResponse({ description: CHANGE_STATUS_OK, type: TaskSchema })
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
  @Patch(Route.ChangeStatus)
  public async changeStatus(@Body() body, @Headers(AUTHORIZATION_FIELD) auth) {
    return await this.taskService.updateTask(body, auth, Route.ChangeStatus);
  }

  @ApiOperation({ description: ASSIGN_CONTRACTOR })
  @ApiBearerAuth()
  @ApiBody({ type: AssignContractorSchema })
  @ApiOkResponse({ description: ASSIGN_CONTRACTOR_OK, type: TaskSchema })
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
  @Patch(Route.AssignContractor)
  public async assignContractor(
    @Body() body,
    @Headers(AUTHORIZATION_FIELD) auth
  ) {
    return await this.taskService.updateTask(
      body,
      auth,
      Route.AssignContractor
    );
  }

  @ApiOperation({ description: MY_TASKS })
  @ApiBearerAuth()
  @ApiQuery({ type: ApiMyTasksQuery })
  @ApiOkResponse({ description: MY_TASKS_OK, type: [TaskSchema] })
  @ApiUnauthorizedResponse({
    description: UNAUTHORIZED,
    type: UserUnauthorizedSchema,
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @Get(Route.MyTasks)
  public async getMyTasks(@Query() query, @Headers(AUTHORIZATION_FIELD) auth) {
    return await this.taskService.getTasks(query, Route.MyTasks, auth);
  }

  @ApiOperation({ description: NOTIFY })
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: NOTIFY_OK })
  @ApiUnauthorizedResponse({
    description: UNAUTHORIZED,
    type: UserUnauthorizedSchema,
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @Get(Route.GetNotify)
  public async getNotify(@Headers(AUTHORIZATION_FIELD) auth) {
    return await this.taskService.notify(auth);
  }

  @ApiOperation({ description: SHOW })
  @ApiParam({
    name: 'id',
    description: 'ID задачи',
    example: '3',
  })
  @ApiOkResponse({ description: SHOW_OK, type: TaskSchema })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @ApiNotFoundResponse({
    description: TASK_NOT_FOUND,
    type: TaskNotFoundSchema,
  })
  @Get(':id')
  public async show(@Param('id') id) {
    return await this.taskService.getTask(id);
  }

  @ApiOperation({ description: SHOW_ALL })
  @ApiQuery({ type: ApiTaskQuery })
  @ApiOkResponse({ description: SHOW_ALL_OK, type: [TaskSchema] })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @Get('')
  public async showAll(@Query() query) {
    return await this.taskService.getTasks(query);
  }

  @ApiOperation({ description: CREATE })
  @ApiBearerAuth()
  @ApiBody({ type: CreateTaskSchema })
  @ApiCreatedResponse({ description: CREATED_OK, type: TaskSchema })
  @ApiUnauthorizedResponse({
    description: UNAUTHORIZED,
    type: UserUnauthorizedSchema,
  })
  @ApiBadRequestResponse({ description: BAD_REQUEST, type: BadRequestSchema })
  @ApiForbiddenResponse({ description: FORBIDDEN_ROLE, type: ForbiddenSchema })
  @Post('')
  public async create(@Body() body, @Headers(AUTHORIZATION_FIELD) auth) {
    return await this.taskService.create(body, auth);
  }

  @ApiOperation({ description: UPDATE })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'ID задачи',
    example: '3',
  })
  @ApiBody({ type: UpdateTaskSchema })
  @ApiOkResponse({ description: UPDATED_OK, type: TaskSchema })
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
  @Patch('/:id')
  public async update(
    @Param('id') id,
    @Body() body,
    @Headers(AUTHORIZATION_FIELD) auth
  ) {
    return await this.taskService.updateTask(body, auth, `${id}`);
  }

  @ApiOperation({ description: DELETE })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'ID задачи',
    example: '3',
  })
  @ApiOkResponse({ description: DELETED_OK, type: TaskSchema })
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
  @Delete(':id')
  public async delete(@Param('id') id, @Headers(AUTHORIZATION_FIELD) auth) {
    return await this.taskService.delete(id, auth);
  }
}
