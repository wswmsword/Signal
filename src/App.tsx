// import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/nav-bar";
import DraftsDrawer from "./components/drafts-drawer";
import Collection from "./components/pages/collection";
import Latest from "./components/pages/latest";
import Rooms from "./components/pages/rooms";
import { Routes, Route } from "react-router-dom";
import preval from "preval.macro";
import GreyPinPlace from "./components/fakes/grey-pin-place";
import React from "react";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="collections">
          <Route path=":id" element={<Collection />}>
            <Route path="msgs">
              <Route path=":msgId" element={<GreyPinPlace />} />
            </Route>
          </Route>
        </Route>
        <Route path="rooms" element={<Rooms />} />
        <Route path="" element={<Latest />}>
          <Route path="msgs">
            <Route path=":msgId" element={<GreyPinPlace />} />
          </Route>
        </Route>
      </Routes>
      <DraftsDrawer />
      <p>
        最后 build 时间: {preval`module.exports = new Date().toLocaleString();`}.
      </p>
    </div>
  );
}

export default App;
