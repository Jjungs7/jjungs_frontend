import axios, { AxiosPromise, Method } from 'axios';

const api = axios.create({
  baseURL: 'https://api.jjungs.kr',
  timeout: 5000,
  withCredentials: true,
});

export default function apireq(method:Method, path:string, data:({[key:string]:any} | null) = null)
  : AxiosPromise<any> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: '',
  };
  const token: string|null = localStorage.getItem('auth.accessToken');
  if (token) headers.Authorization = `Bearer ${token}`;

  return api({
    url: path,
    method,
    data,
    headers,
  });
}
