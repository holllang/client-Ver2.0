import { CONFIG } from '@config';
import axios from 'axios';

const baseInstance = axios.create({
  baseURL: CONFIG.API_END_POINT,
  timeout: 5000,
});

export { baseInstance };
