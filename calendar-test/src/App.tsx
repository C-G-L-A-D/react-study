import { useRef } from 'react';
import Calendar, { CalendarRef } from './components/Calendar'

function App() {
  const calendarRef = useRef<CalendarRef>(null)

  const setCalendarTime = () => {
    calendarRef.current?.setDate(new Date('2023-5-3'))
  }
  const getCalendarTime = () => {
    const date = calendarRef.current?.getDate()
    console.log(date?.toLocaleDateString())
  }

  return (
    <div>
      <button onClick={setCalendarTime}>设置时间为 2023-05-03</button>
      <button onClick={getCalendarTime}>获取当前时间</button>
      <Calendar ref={calendarRef} defaultValue={new Date('2024, 3, 5')}/>
      <Calendar />
    </div>
  );
}

export default App;
