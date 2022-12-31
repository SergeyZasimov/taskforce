export type Review = {
  _id?: string;
  authorId: string;
  contractorId: string;
  taskId: number;
  text: string;
  rating: number;
};
