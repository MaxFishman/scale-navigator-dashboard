import './App.css';
import Navigation from './Navigation';
import Workspace from './components/Workspace/Workspace';
import { Col, Row } from 'antd';

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
