/** @format */

import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./routes/Router";
import { LoadingProvider } from "./contexts/LoadingContext/LoadingContext";
import { createBrowserHistory } from "@remix-run/router";

export const history = createBrowserHistory();

function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
