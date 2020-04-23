import React from 'react';
import { BrowserRouter, Route, Switch,} from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/login/login';
import User from './pages/user/user';
import Project from './pages/project/project';
import './App.scss';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/project/:projectId' component={Project} />
          <Route path ='/user' component={User} />
          <Route path ='/login' component={Login} />
          <Route exact path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
