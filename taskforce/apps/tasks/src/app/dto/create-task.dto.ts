export class CreateTaskDto {
  public title: string;
  public description: string;
  public category: string;
  public price?: number;
  public executionTerm?: string;
  public address?: string;
  public tags?: string[];
}
