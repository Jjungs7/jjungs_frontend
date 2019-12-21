import axios, { AxiosPromise, Method } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

export default function apireq(method:Method, url:string, data:({string:any} | null) = null)
  : AxiosPromise<any> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: '',
  };
  const token: string|null = localStorage.getItem('accessToken');
  if (token) headers.Authorization = `Bearer ${token}`;

  return api({
    url,
    method,
    data,
    headers,
  });
}
