import React from 'react';
import Login from './login';
import Blog from './blog';
import Header from './header';
import Admin from './admin';
import { Switch, Route } from 'react-router-dom';
class App extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/admin" component={Admin} />
        </Switch>
      </React.Fragment>
    )
  }
}
export default App;