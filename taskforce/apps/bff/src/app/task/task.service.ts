import { Injectable } from '@nestjs/common';
import {
  Route,
  RouteDomain,
  RouteModule,
  Subscriber,
  Task,
  User,
} from '@taskforce/shared-types';
import got, { RequestError } from 'got';

const { TasksUrl, UsersUrl, NotifyUrl } = RouteDomain;
const { Tasks, Profile, Notify } = RouteModule;
const { GetNotify, MyProfile, GetSubscriber } = Route;

@Injectable()
export class TaskService {
  public async updateTask(body, auth, path?) {
    try {
      const task: Task = await got
        .patch(`${TasksUrl}/${Tasks}/${path ? path : ''}`, {
          json: body,
          headers: {
            Authorization: auth,
          },
        })
        .json();

      const customer = await got
        .get(`${UsersUrl}/${Profile}/${task.customerId}`)
        .json();

      const contractor =
        task.contractorId &&
        (await got.get(`${UsersUrl}/${Profile}/${task.contractorId}`).json());

      return { ...task, customerId: customer, contractorId: contractor };
    } catch (error) {
      if (error instanceof RequestError) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }

  public async getTasks(query, path?, auth?) {
    console.log(query);
    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    console.log(queryString);
    try {
      const tasks: Task[] = await got
        .get(
          `${TasksUrl}/${Tasks}/${path ? path : ''}${
            queryString ? `?${queryString}` : ''
          }`,
          {
            headers: {
              Authorization: auth,
            },
          }
        )
        .json();

      const result = Promise.all(
        tasks.map(async (task) => {
          try {
            const customer = await got
              .get(`${UsersUrl}/${Profile}/${task.customerId}`)
              .json();
            const contractor =
              task.contractorId &&
              (await got
                .get(`${UsersUrl}/${Profile}/${task.contractorId}`)
                .json());
            return { ...task, customerId: customer, contractorId: contractor };
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

  public async notify(auth) {
    try {
      const { email }: User = await got
        .get(`${UsersUrl}/${Profile}/${MyProfile}`, {
          headers: {
            Authorization: auth,
          },
        })
        .json();

      const { lastNotify }: Subscriber = await got
        .post(`${NotifyUrl}/${Notify}/${GetSubscriber}`, {
          json: JSON.parse(JSON.stringify({ email })),
        })
        .json();

      await got.get(
        `${TasksUrl}/${Tasks}/${GetNotify}${
          lastNotify ? `?lastNotify=${lastNotify}` : ''
        }`,
        {
          headers: {
            Authorization: auth,
          },
        }
      );
    } catch (error) {
      if (error instanceof RequestError && error.response) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }

  public async getTask(id) {
    try {
      const task: Task = await got.get(`${TasksUrl}/${Tasks}/${id}`).json();

      const customer = await got
        .get(`${UsersUrl}/${Profile}/${task.customerId}`)
        .json();

      const contractor =
        task.contractorId &&
        (await got.get(`${UsersUrl}/${Profile}/${task.contractorId}`).json());

      return { ...task, customerId: customer, contractorId: contractor };
    } catch (error) {
      if (error instanceof RequestError && error.response) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }

  public async create(body, auth) {
    try {
      const task: Task = await got
        .post(`${TasksUrl}/${Tasks}`, {
          json: body,
          headers: { Authorization: auth },
        })
        .json();

      const customer = await got
        .get(`${UsersUrl}/${Profile}/${task.customerId}`)
        .json();

      return { ...task, customerId: customer };
    } catch (error) {
      if (error instanceof RequestError && error.response) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }

  public async delete(id, auth) {
    try {
      await got.delete(`${TasksUrl}/${Tasks}/${id}`, {
        headers: { Authorization: auth },
      });
    } catch (error) {
      if (error instanceof RequestError && error.response) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }
}
