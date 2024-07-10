import Calendar from './components/Calendar'

function App() {
  return (
    <div>
      <Calendar defaultValue={new Date('2024, 3, 5')}/>
      <Calendar />
    </div>
  );
}

export default App;
