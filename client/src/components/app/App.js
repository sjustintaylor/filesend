import logo from "./logo.svg";
import "./App.css";

// Setup theming
import "assets/css/responsive.scss";
import "assets/css/colors.css";
import "assets/css/typography.css";
import "assets/css/resets.css";

// Components
import Button from "components/atoms/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button label="Hello" />
      </header>
    </div>
  );
}

export default App;
