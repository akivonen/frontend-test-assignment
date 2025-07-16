import { TokenResponse } from '@src/types';
import http from './http';
import { handleError } from '@src/lib/utils';

export default async function getToken(): Promise<TokenResponse> {
  try {
    const response = await http.post<TokenResponse>(
      '/token',
      {},
      { headers: { Accept: 'application/json' } }
    );
    return response.data;
  } catch (error) {
    return handleError(error, 'getToken');
  }
}
