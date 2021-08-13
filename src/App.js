import './App.css';
import Navigation from './components/Navigation/Navigation';
import Workspace from './components/Workspace/Workspace';
import Pfivesketch from './components/Navigation/Navigator/Pfivesketch';
import ChordPlayer from './audio/ChordPlayer';
import { Col, Row } from 'antd';

function App() {
  const p5Sketch = new Pfivesketch();
  const navigator = p5Sketch.props.navigator;

  new ChordPlayer(navigator);

  return (
    <div className="App">
      <div id="grid">
          <Navigation p5Sketch={ p5Sketch } />
          <Workspace navigator={ navigator } />
      </div>
    </div>
  );
}

export default App;
