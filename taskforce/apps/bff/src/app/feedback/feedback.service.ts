import { Injectable } from '@nestjs/common';
import { Feedback, RouteDomain, RouteModule } from '@taskforce/shared-types';
import got, { RequestError } from 'got';

const { TasksUrl, UsersUrl } = RouteDomain;
const { Feedbacks, Profile } = RouteModule;

@Injectable()
export class FeedbackService {
  public async getFeedbacks(query, auth) {
    try {
      const feedbacks: Feedback[] = await got
        .get(`${TasksUrl}/${Feedbacks}?taskId=${query.taskId}`, {
          headers: {
            Authorization: auth,
          },
        })
        .json();

      const result = Promise.all(
        feedbacks.map(async (feedback) => {
          try {
            const user = await got
              .get(`${UsersUrl}/${Profile}/${feedback.contractorId}`, {
                headers: {
                  Authorization: auth,
                },
              })
              .json();
            return { ...feedback, userId: user };
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
      const newFeedback: Feedback = await got
        .post(`${TasksUrl}/${Feedbacks}`, {
          json: body,
          headers: {
            Authorization: auth,
          },
        })
        .json();
      const user = await got
        .get(`${UsersUrl}/${Profile}/${newFeedback.contractorId}`, {
          headers: {
            Authorization: auth,
          },
        })
        .json();
      return { ...newFeedback, contractorId: user };
    } catch (error) {
      if (error instanceof RequestError) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }
}
