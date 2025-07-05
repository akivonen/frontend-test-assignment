import { handleError } from '@src/lib/utils';
import http from './http';
import { User } from 'types';

export default async function getAllUsers(): Promise<User[] | undefined> {
  try {
    /*
    To avoid conflicts in data during fetching by steps 
    in case of registration of new user with API
    users should to be fetched at once
    */
    const initResponse = await http.get('/users', {
      params: {
        page: 1, //testing value
        count: 6, //testing value
      },
    });
    const response = await http.get('/users', {
      params: {
        page: 1,
        count: initResponse.data.total_users,
      },
    });
    const users: User[] = response.data.users;
    /*
    Users are sorted by ID according to API docs
    and should to be sorted by registration_timestamp
    */
    users.sort((a, b) => b.registration_timestamp - a.registration_timestamp);
    return users;
  } catch (error) {
    // throw and implement error view in UI
    handleError(error, 'getAllUsers');
  }
}
