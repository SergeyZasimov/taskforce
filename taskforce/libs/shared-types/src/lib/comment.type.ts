export type Comment = {
  id?: number;
  text: string;
  userId: string;
  taskId: number;
  createdAt?: Date;
};
