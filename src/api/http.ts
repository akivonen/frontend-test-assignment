import axios from 'axios';
import { API_BASE_URL } from '@src/constants/api';

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

export default http;
