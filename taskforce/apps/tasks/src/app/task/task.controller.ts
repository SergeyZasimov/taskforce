import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiParam, ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { AssignContractorDto } from './dto/assign-contractor.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskQuery } from './query/task.query';
import { TaskRdo } from './rdo/task.rdo';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('change-status')
  public async changeStatus(
    @Body() dto: ChangeStatusDto,
    @GetCurrentUser('role') role: UserRole
  ) {
    return fillObject(TaskRdo, this.taskService.changeStatus(dto, role));
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Customer)
  @Patch('assign-contractor')
  public async assignContractor(
    @Body() dto: AssignContractorDto,
    @GetCurrentUser('sub') customerId: string
  ) {
    return await this.taskService.assignContractor(dto, customerId);
  }

  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '3',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Show task information by ID',
    type: TaskRdo,
  })
  @Get('/:id')
  public async show(@Param('id') id: number) {
    const task = await this.taskService.getTask(id);
    return fillObject(TaskRdo, task);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Show tasks by query parameters',
    type: TaskRdo,
  })
  @Get('/')
  public async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getTasks(query);
    return fillObject(TaskRdo, tasks);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Crate new task',
    type: TaskRdo,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Customer)
  @Post('/')
  public async create(
    @Body() dto: CreateTaskDto,
    @GetCurrentUser('sub') userId: string
  ) {
    const newTask = await this.taskService.createTask({
      ...dto,
      customerId: userId,
    });
    return fillObject(TaskRdo, newTask);
  }

  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '3',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update task information by ID',
    type: TaskRdo,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Customer)
  @Patch('/:id')
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateTaskDto,
    @GetCurrentUser('sub') userId: string
  ) {
    const updatedTask = await this.taskService.updateTask(id, {
      ...dto,
      customerId: userId,
    });
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiParam({
    name: 'id',
    description: 'Task ID',
    example: '3',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Delete task by ID',
    type: TaskRdo,
  })
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(UserRole.Customer)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(
    @Param('id') id: number,
    @GetCurrentUser('sub') customerId: string
  ) {
    await this.taskService.deleteTask(id, customerId);
  }
}
