import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import store from './configstore.js';
import { Provider } from 'react-redux';
import User from './user';
import Header from './header';
import Footer from './footer';


ReactDOM.render(<BrowserRouter forceRefresh={false}>
  <Provider store={store}>

    <body class="hold-transition skin-blue sidebar-mini">
      <div class="wrapper">

        <Header />

        <div class="content-wrapper">

          <section class="content-header">

          </section>


          <section class="content container-fluid">

            <Switch>

              <Route exact path="/" component={User} />

            </Switch>

          </section>

        </div>
        <Footer />
      </div>

    </body>

  </Provider>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
