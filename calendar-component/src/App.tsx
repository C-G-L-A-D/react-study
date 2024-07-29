import dayjs from 'dayjs';
import Calendar from './components/Calendar'
function App() {
  return (
    <div className="App">
      <Calendar value={dayjs('2022-01-01')}/>
    </div>
  );
}

export default App;
