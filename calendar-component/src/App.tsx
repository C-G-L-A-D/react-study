import dayjs from 'dayjs';
import Calendar from './components/Calendar'
function App() {
  return (
    <div className="App">
      <Calendar value={dayjs('2022-01-01')}
        dateRender={(date) => {
          return <div>
            <p style={{background: 'yellowgreen', height: '300px'}}>
              {date.format('YYYY-MM-DD')}
            </p>
          </div>
        }}
      />
    </div>
  );
}

export default App;
