import { Injectable } from '@nestjs/common';
import { Review, RouteDomain, RouteModule } from '@taskforce/shared-types';
import got, { RequestError } from 'got';

const { TasksUrl, UsersUrl } = RouteDomain;
const { Reviews, Profile } = RouteModule;

@Injectable()
export class ReviewService {
  public async create(body, auth) {
    try {
      const newReview: Review = await got
        .post(`${TasksUrl}/${Reviews}`, {
          json: body,
          headers: {
            Authorization: auth,
          },
        })
        .json();
      const user = await got
        .get(`${UsersUrl}/${Profile}/${newReview.customerId}`, {
          headers: {
            Authorization: auth,
          },
        })
        .json();
      return { ...newReview, customerId: user };
    } catch (error) {
      if (error instanceof RequestError) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }

  public async getReviews(query) {
    try {
      const reviews: Review[] = await got
        .get(`${TasksUrl}/${Reviews}?contractorId=${query.contractorId}`)
        .json();

      const result = Promise.all(
        reviews.map(async (review) => {
          try {
            const user = await got
              .get(`${UsersUrl}/${Profile}/${review.customerId}`)
              .json();
            return { ...review, customerId: user };
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
}
