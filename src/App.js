import './App.css';
import Navigation from './components/Navigation/Navigation';
import Workspace from './components/Workspace/Workspace';
import Pfivesketch from './components/Navigation/Navigator/Pfivesketch';
import { Col, Row } from 'antd';

function App() {
  const p5Sketch = Pfivesketch();

  return (
    <div className="App">
      <div id="grid">
          <Navigation p5Sketch={ p5Sketch } />
          <Workspace />
      </div>
    </div>
  );
}

export default App;
