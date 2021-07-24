import './App.css';
import Navigation from './Navigation';
import Workspace from './Workspace';

function App() {
  return (
    <div className="App">
      <div id="grid">
        <Navigation />
        <Workspace />
      </div>
    </div>
  );
}

export default App;
