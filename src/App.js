// CSS
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// React Router DOM
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// Pages
import HomePage from './pages/Home/Home';
import DetailsPage from './pages/Detail/Detail';

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
          <Route exact path="/" component={HomePage} />                      
          <Route exact path="/:catId" component={DetailsPage} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
