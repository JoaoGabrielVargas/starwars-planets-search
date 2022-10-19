import './App.css';
import Filters from './components/Filters';
import Table from './components/Table';

function App() {
  return (
    <div>
      <h1>Star Wars Planets</h1>
      <Filters />
      <Table />
    </div>
  );
}

export default App;
