import { handleError } from '@src/lib/utils';
import http from './http';
import {
  User,
  UsersRegistrationResponse,
  UsersResponse,
  UserSignUpData,
} from '@src/types';

export async function getAllUsers(): Promise<UsersResponse> {
  /*
    To avoid conflicts in data during fetching by steps 
    in case of registration of new user with API
    users should to be fetched at once
    */

  try {
    const initResponse = await http.get<UsersResponse>('/users', {
      params: {
        page: 1, //testing value
        count: 6, //testing value
      },
    });
    if (!initResponse.data.success) {
      return initResponse.data;
    }
    const response = await http.get<UsersResponse>('/users', {
      params: {
        page: 1,
        count: initResponse.data.total_users,
      },
    });
    if (response.data.success) {
      /*
      Users are sorted by ID according to API docs
      and should to be sorted by registration_timestamp
      */
      const users: User[] = response.data.users.sort(
        (a, b) => b.registration_timestamp - a.registration_timestamp
      );
      console.log(users);
      return { ...response.data, users };
    }
    return response.data;
  } catch (error) {
    return handleError(error, 'getAllUsers');
  }
}

export async function registerUser(
  user: UserSignUpData,
  token: string
): Promise<UsersRegistrationResponse> {
  try {
    const response = await http.post<UsersRegistrationResponse>(
      '/users',
      user,
      {
        headers: {
          Token: token,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    return handleError(error, 'registerUser');
  }
}
