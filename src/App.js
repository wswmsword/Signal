import logo from './logo.svg';
import './App.css';
import NavBar from './components/nav-bar';
import {useState} from 'react';

function App() {
  const [show, toggle] = useState(false);

  return (
    <div className="App">
      <NavBar />
      <button onClick={() => toggle(!show)}>Toggle</button>
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React !!
        </a>
      </header>
    </div>
  );
}

export default App;
