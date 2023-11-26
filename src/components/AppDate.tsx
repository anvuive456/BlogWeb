import {parseISO, format} from 'date-fns';
import {vi} from 'date-fns/locale';

export default function AppDate({dateString}: { dateString: string }) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'd LLLL, yyyy', {
    locale: vi
  })}</time>;

}
