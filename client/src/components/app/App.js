import logo from "./logo.svg";
import "./App.css";

// Setup theming
import "assets/css/responsive.css";
import "assets/css/colors.css";
import "assets/css/typography.css";
import "assets/css/resets.css";

// Components
import Router from "components/router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Router />
      </div>
    </BrowserRouter>
  );
}

export default App;
