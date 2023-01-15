import { Injectable } from '@nestjs/common';
import { ApiCommentQuery } from '@taskforce/api-documentation';
import { Comment, RouteDomain, RouteModule } from '@taskforce/shared-types';
import { RequestError } from 'got/dist/source';
import got from 'got';

const { TasksUrl, UsersUrl } = RouteDomain;
const { Comments, Profile } = RouteModule;

@Injectable()
export class CommentService {
  public async getComments({ taskId, page }: ApiCommentQuery, auth) {
    try {
      const comments: Comment[] = await got
        .get(
          `${TasksUrl}/${Comments}?taskId=${taskId}${
            page ? `&page=${page}` : ''
          }`,
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .json();

      const result = Promise.all(
        comments.map(async (comment) => {
          try {
            const user = await got
              .get(`${UsersUrl}/${Profile}/${comment.userId}`, {
                headers: {
                  Authorization: auth,
                },
              })
              .json();
            return { ...comment, userId: user };
          } catch (error) {
            if (error instanceof RequestError) {
              return JSON.parse(error.response.body as string);
            }
            return error;
          }
        })
      );
      return result;
    } catch (error) {
      if (error instanceof RequestError) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }

  public async create(body, auth) {
    try {
      const newComment: Comment = await got
        .post(`${TasksUrl}/${Comments}`, {
          json: body,
          headers: {
            Authorization: auth,
          },
        })
        .json();

      const user = await got
        .get(`${UsersUrl}/${Profile}/${newComment.userId}`, {
          headers: {
            Authorization: auth,
          },
        })
        .json();
      return { ...newComment, userId: user };
    } catch (error) {
      if (error instanceof RequestError) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }

  public async delete(id, auth) {
    try {
      await got.delete(`${TasksUrl}/${Comments}/${id}`, {
        headers: {
          Authorization: auth,
        },
      });
    } catch (error) {
      if (error instanceof RequestError) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }
}
