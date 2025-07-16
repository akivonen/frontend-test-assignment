import { PositionsResponse } from '@src/types';
import http from './http';
import { handleError } from '@src/lib/utils';

export default async function getAllPositions(): Promise<PositionsResponse> {
  try {
    const response = await http.get<PositionsResponse>('/positions');
    return response.data;
  } catch (error) {
    return handleError(error, 'getPositions');
  }
}
