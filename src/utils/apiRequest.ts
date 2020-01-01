import axios, { AxiosPromise, Method } from 'axios';

const api = axios.create({
  baseURL: 'https://api.jjungs.kr',
  timeout: 5000,
  withCredentials: true,
});

export function fileUpload(fileName:string, data: FormData)
  : AxiosPromise<any> {
  const headers = {
    'Content-Type': 'multipart/form-data',
    Authorization: '',
  };
  const token: string|null = localStorage.getItem('auth.accessToken');
  if (token) headers.Authorization = `Bearer ${token}`;

  return api({
    url: `/admin/file/${fileName}`,
    method: 'POST',
    data,
    headers,
  });
}

export function apireq(method:Method, path:string, data:({[key:string]:any} | null) = null)
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
