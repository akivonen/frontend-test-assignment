import http from './http';

export default async function getToken(): Promise<void> {
  try {
    const response = await http.get('/token');
    localStorage.setItem('authToken', JSON.stringify(response.data.token));
  } catch (error) {
    console.log(error);
  }
}
