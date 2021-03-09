import {
  differenceInHours,
  differenceInMinutes,
  format,
  isToday,
  isYesterday,
} from 'date-fns';

export default function formatDateTodayYesterday(date: Date): string {
  const now = new Date(Date.now());
  if (isToday(date)) {
    if (differenceInHours(now, date)) {
      const hoursAgo = differenceInHours(now, date);
      return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
    }
    if (differenceInMinutes(now, date)) {
      const minutesAgo = differenceInMinutes(now, date);
      return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
    }
    return 'Created now';
  }

  if (isYesterday(date)) {
    return format(date, `'Yesterday at 'hh:mm aaa`);
  }

  return format(date, 'MM/dd/yyyy hh:mm aaa');
}
