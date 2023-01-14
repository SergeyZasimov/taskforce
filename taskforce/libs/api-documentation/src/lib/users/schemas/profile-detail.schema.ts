import { ApiPropertyOptional, IntersectionType } from '@nestjs/swagger';
import { ProfileSchema } from './profile.schema';

class CustomerAdditionalInfo {
  @ApiPropertyOptional({
    description: 'Количество задач заказчика',
    example: 4,
  })
  public tasks: number;

  @ApiPropertyOptional({
    description: 'Количество новых задач заказчика',
    example: 4,
  })
  public newTasks: number;
}

class ContractorAdditionalInfo {
  @ApiPropertyOptional({
    description: 'Количество завершенных задач исполнителя',
    example: 4,
  })
  public completeTasks: number;

  @ApiPropertyOptional({
    description: 'Количество проваленных задач исполнителя',
    example: 4,
  })
  public failedTasks: number;

  @ApiPropertyOptional({
    description: 'Оценка исполнителя',
    example: 2.5,
  })
  public rating: number;

  @ApiPropertyOptional({
    description: 'Место исполнителя в рейтинге',
    example: 1,
  })
  public ratingPlace: number;
}

class CustomerDetailSchema extends IntersectionType(
  ProfileSchema,
  CustomerAdditionalInfo
) {}

export class ProfileDetailSchema extends IntersectionType(
  CustomerDetailSchema,
  ContractorAdditionalInfo
) {}
