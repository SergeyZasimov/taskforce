import { Expose } from 'class-transformer';

export class CommentRdo {
  @Expose() public id: number;
  @Expose() public text: string;
  @Expose() public userId: string;
  @Expose() public createdAt: Date;
}
