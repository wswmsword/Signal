// import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/nav-bar";
import DraftsDrawer from "./components/drafts-drawer";
import {useState} from 'react';
import Collection from "./components/pages/collection";
import Drafts from "./components/pages/drafts";
import Latest from "./components/pages/latest";
import Rooms from "./components/pages/rooms";
import { Routes, Route } from "react-router-dom";
import preval from "preval.macro";

function App() {
  const [show, toggle] = useState(false);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="collections">
          <Route path=":id" element={<Collection />} />
        </Route>
        <Route path="rooms" element={<Rooms />} />
        <Route path="" element={<Latest />} />
        <Route path="drafts" element={<Drafts />} />
      </Routes>
      <DraftsDrawer />
      <p>
        最后 build 时间: {preval`module.exports = new Date().toLocaleString();`}.
      </p>
    </div>
  );
}

export default App;
