export type Feedback = {
  id?: number;
  text?: string;
  price?: number;
  contractorId?: string;
  taskId: number;
  createdAt?: Date;
};
