import { Position } from 'types';
import http from './http';

export default async function getPositions(): Promise<Position[]> {
  try {
    const response = await http.get('/positions');
    if (!response.data.success) {
      return [];
      // throw new Error(`Failed to fetch positions: ${response.data.message}`);
    }
    return response.data.positions;
  } catch (error) {
    throw new Error('Failed to fetch positions');
  }
}
