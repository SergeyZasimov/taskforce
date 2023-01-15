import { Injectable } from '@nestjs/common';
import { RequestError } from 'got/dist/source';
import got from 'got';
import {
  Rating,
  Route,
  RouteDomain,
  RouteModule,
  TaskStatus,
  User,
  UserRole,
} from '@taskforce/shared-types';

const { UsersUrl, TasksUrl } = RouteDomain;
const { Profile, Reviews, Tasks } = RouteModule;
const { GetRating, TasksCounter } = Route;

@Injectable()
export class ProfileService {
  public async update(body, auth) {
    try {
      const updatedUser = await got
        .patch(`${UsersUrl}/${Profile}`, {
          json: body,
          headers: {
            Authorization: auth,
          },
        })
        .json();
      return updatedUser;
    } catch (error) {
      if (error instanceof RequestError) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }

  public async showDetail(id, auth) {
    try {
      let userDetail;
      const user: User = await got
        .get(`${UsersUrl}/${Profile}/${id}`, {
          headers: {
            Authorization: auth,
          },
        })
        .json();

      if (user.role === UserRole.Contractor) {
        const rating: Rating = await got
          .get(`${TasksUrl}/${Reviews}/${GetRating}?contractorId=${id}`, {
            headers: {
              Authorization: auth,
            },
          })
          .json();

        const failedTasks = await got
          .get(
            `${TasksUrl}/${Tasks}/${TasksCounter}?userId=${id}&status=${TaskStatus.Fail}`,
            {
              headers: {
                Authorization: auth,
              },
            }
          )
          .json();

        const completeTasks = await got
          .get(
            `${TasksUrl}/${Tasks}/${TasksCounter}?userId=${id}&status=${TaskStatus.Complete}`,
            {
              headers: {
                Authorization: auth,
              },
            }
          )
          .json();

        userDetail = { ...user, ...rating, completeTasks, failedTasks };
      }

      if (user.role === UserRole.Customer) {
        const tasks = await got
          .get(`${TasksUrl}/${Tasks}/${TasksCounter}?userId=${id}`, {
            headers: {
              Authorization: auth,
            },
          })
          .json();

        const newTasks = await got
          .get(
            `${TasksUrl}/${Tasks}/${TasksCounter}?userId=${id}&status=${TaskStatus.New}`,
            {
              headers: {
                Authorization: auth,
              },
            }
          )
          .json();

        userDetail = { ...user, tasks, newTasks };
      }

      return userDetail;
    } catch (error) {
      if (error instanceof RequestError) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }
}
