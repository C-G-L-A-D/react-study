import { Dayjs } from 'dayjs';
import './index.scss';
import MonthCalendar from './MonthCalendar';

export interface CalendarProps {
    value: Dayjs
}

function Calendar(props: CalendarProps) {
    return <div className="calendar">
        <div className="calendar-header"></div>
        <MonthCalendar {...props}/>
    </div>
}

export default Calendar