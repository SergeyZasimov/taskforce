export type Feedback = {
  id?: number;
  text?: string;
  price?: number;
  userId: string;
  taskId: number;
  createdAt?: Date;
};
