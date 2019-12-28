export default function (): boolean {
  const token = localStorage.getItem('auth.accessToken');
  const expires = localStorage.getItem('auth.expiresAt');

  if (token && expires && parseInt(expires, 10) > (new Date()).getTime()) {
    return true;
  }
  return false;
}
