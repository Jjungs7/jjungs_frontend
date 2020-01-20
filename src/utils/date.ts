export function timediff(_d1: string|number, _d2: string|number): number {
  const MS = 1000;
  const d1 = new Date(_d1);
  const d2 = new Date(_d2);
  const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate(),
    d1.getHours(), d1.getMinutes(), d1.getSeconds());
  const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate(),
    d2.getHours(), d2.getMinutes(), d2.getSeconds());
  return Math.trunc(Math.floor((utc1 - utc2) / MS));
}

export function parseDateTime(d: string|number, format: string): string {
  const compatible = ['YYYY-MM-DD HH:mm:SS', 'YYYY-MM-DD', 'YYYY. MM. DD.'];
  let ret = '';

  if (format === 'ISO') ret = 'YYYY-MM-DDTHH:mm:SS+09:00';
  else if (compatible.includes(format)) ret = format;
  else return ''; // not compatible

  const appendZeroInFront = (literal: string | number) => `0${literal}`.slice(-2);

  const date = new Date(d);
  const year: string = date.getFullYear().toString();
  const month: string = appendZeroInFront(date.getMonth() + 1);
  const day: string = appendZeroInFront(date.getDate());
  const hours: string = appendZeroInFront(date.getHours());
  const minutes: string = appendZeroInFront(date.getMinutes());
  const seconds: string = appendZeroInFront(date.getSeconds());

  ret = ret.replace('YYYY', year);
  ret = ret.replace('MM', month);
  ret = ret.replace('DD', day);
  ret = ret.replace('HH', hours);
  ret = ret.replace('mm', minutes);
  ret = ret.replace('SS', seconds);

  return ret;
}

export function getTimeAgo(d: string|number): string {
  const MINUTES = 60;
  const HOURS = MINUTES * 60;
  const DAYS = HOURS * 24;
  const d1 = new Date(Date.now());
  const d2 = new Date(d);
  const PREV_MONTH_DAYS = new Date(d1.getFullYear(), d1.getMonth(), 0).getDate() * DAYS;
  const CUR_MONTH_DAYS = new Date(d1.getFullYear(), d1.getMonth() + 1, 0).getDate() * DAYS;
  const PREV_YEAR_DAYS = 365;
  const diff = timediff(d1.toISOString(), d2.toISOString());

  let ret = '';
  if (diff < MINUTES) ret = `${diff}초 전`;
  else if (diff < HOURS) ret = `${Math.trunc(diff / MINUTES)}분 전`;
  else if (diff < DAYS) ret = `${Math.trunc(diff / HOURS)}시간 전`;
  else if (diff < PREV_MONTH_DAYS) ret = `${Math.trunc(diff / DAYS)}일 전`;
  else if (PREV_MONTH_DAYS < diff && diff < CUR_MONTH_DAYS) ret = `${Math.trunc(diff / PREV_MONTH_DAYS)}개월 전`;
  else if (diff < PREV_YEAR_DAYS) ret = `${Math.trunc(diff / 30)}개월 전`;
  else ret = `${diff}년 전`;

  return ret;
}
