import { Injectable } from '@nestjs/common';
import { Route, RouteDomain, RouteModule } from '@taskforce/shared-types';
import got from 'got';
import { RequestError } from 'got/dist/source/core';

const { Users } = RouteDomain;
const { Auth } = RouteModule;
const { Register, Login, ChangePassword } = Route;

@Injectable()
export class AuthService {
  public async register(body) {
    try {
      const newUser = await got
        .post(`${Users}/${Auth}/${Register}`, { json: body })
        .json();
      return newUser;
    } catch (error) {
      if (error instanceof RequestError) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }

  public async login(body) {
    try {
      const loggedUser = await got
        .post(`${Users}/${Auth}/${Login}`, { json: body })
        .json();
      return loggedUser;
    } catch (error) {
      if (error instanceof RequestError) {
        return JSON.parse(error.response.body as string);
      }
      return error;
    }
  }

  public async changePassword(body, auth) {
    try {
      const updatedUser = await got
        .patch(`${Users}/${Auth}/${ChangePassword}`, {
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
}
