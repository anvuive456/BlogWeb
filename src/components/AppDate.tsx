import {parseISO, format} from 'date-fns';
import {vi} from 'date-fns/locale';

export default function AppDate({dateString, className}: { dateString: string ,className?: string}) {
  const date = parseISO(dateString);
  return <time className={className} dateTime={dateString}>{format(date, 'd LLLL, yyyy', {
    locale: vi
  })}</time>;

}
