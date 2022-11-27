import { Controller, HttpStatus, Post } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Query,
} from '@nestjs/common/decorators';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { TaskRdo } from '../rdo/task.rdo';
import {
  TASKS_BY_CATEGORY_NOT_FOUND_ERROR,
  TASK_NOT_FOUND_ERROR,
} from './task.const';
import { TaskService } from './task.service';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create new task',
    type: TaskRdo,
  })
  public async create(@Body() dto: CreateTaskDto) {
    const newTask = await this.taskService.createTask(dto);
    return fillObject(TaskRdo, newTask);
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Information about a single task',
    type: TaskRdo,
  })
  public async show(@Param() { id }) {
    const existTask = await this.taskService.getTask(id);

    if (!existTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    return fillObject(TaskRdo, existTask);
  }

  @Get('')
  @ApiQuery({name: 'Category'})
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Information about tasks of the same category',
    type: [TaskRdo],
  })
  public async getByCategory(@Query() { category }) {
    const tasks = await this.taskService.getByCategory(category);
    if (!tasks) {
      throw new Error(TASKS_BY_CATEGORY_NOT_FOUND_ERROR);
    }
    return fillObject(TaskRdo, tasks);
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updating a task',
    type: [TaskRdo],
  })
  public async update(@Param() { id }, @Body() dto: UpdateTaskDto) {
    const existTask = this.taskService.getTask(id);

    if (!existTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }

    const task = await this.taskService.updateTask(id, dto);
    return fillObject(TaskRdo, task);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Deleting a task'
  })
  public async delete(@Param() { id }) {
    const existTask = this.taskService.getTask(id);

    if (!existTask) {
      throw new Error(TASK_NOT_FOUND_ERROR);
    }
  }
}
