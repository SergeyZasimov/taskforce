export class CreateTaskDto {
  public title: string;
  public description: string;
  public category: string;
  public price?: number;
  public executionTerm?: Date;
  public address?: string;
  public tags?: string[];
}
