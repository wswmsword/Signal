// import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/nav-bar";
import DraftsDrawer from "./components/drafts-drawer";
import {useState} from 'react';
import Drafts from "./components/pages/drafts";
import Latest from "./components/pages/latest";
import Rooms from "./components/pages/rooms";
import { Routes, Route } from "react-router-dom";

function App() {
  const [show, toggle] = useState(false);

  return (
    <div className="App">
      <NavBar />
      {/* <button onClick={() => toggle(!show)}>Toggle</button> */}
      {/* <header className="App-header">
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
      </header> */}
      <Routes>
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/" element={<Latest />} />
        <Route path="/drafts" element={<Drafts />} />
      </Routes>
      <DraftsDrawer />
    </div>
  );
}

export default App;
