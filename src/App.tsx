// import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/nav-bar";
import DraftsDrawer from "./components/drafts-drawer";
import { Routes, Route, useLocation } from "react-router-dom";
import preval from "preval.macro";
import GreyPinPlace from "./components/fakes/grey-pin-place";
import { lazy, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

const Collection = lazy(() => import("./components/pages/collection"));
const Latest = lazy(() => import("./components/pages/latest"));
const Rooms = lazy(() => import("./components/pages/rooms"));
const NoMatch = lazy(() => import("./components/pages/404"));
const Event = lazy(() => import("./components/pages/event"));

function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  return (
    <div className="App">
      <NavBar />
      <ErrorBoundary>
        <Suspense fallback={<div>loading ...</div>}>
          <Routes location={state?.backgroundLocation || location}>
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
            <Route path="*" element={<NoMatch />} />
            <Route path="/events/:id" element={<Event />}>
              <Route path="msgs">
                <Route path=":msgId" element={<GreyPinPlace />} />
              </Route>
            </Route>
          </Routes>
        
          {state?.backgroundLocation && (
            <Routes>
              <Route path="/events/:id" element={<Event />}>
                <Route path="msgs">
                  <Route path=":msgId" element={<GreyPinPlace />} />
                </Route>
              </Route>
            </Routes>
          )}
        </Suspense>
      </ErrorBoundary>
      <DraftsDrawer />
      <p>
        最后 build 时间: {preval`module.exports = new Date().toLocaleString();`}.
      </p>
    </div>
  );
}

export default App;
