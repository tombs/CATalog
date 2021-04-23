// CSS
import './App.css';

// React Router DOM
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Pages
import HomePage from './pages/Home/Home'

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          {/* HomePage route */}
          <Route exact path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
