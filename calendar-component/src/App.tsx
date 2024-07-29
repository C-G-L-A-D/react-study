import dayjs from 'dayjs';
import Calendar from './components/Calendar'
function App() {
  return (
    <div className="App">
      <Calendar value={dayjs('2022-01-01')} onChange={
        date => console.log('已选中', date.format('YYYY 年 MM 月 DD 日'))
      }/>
    </div>
  );
}

export default App;
