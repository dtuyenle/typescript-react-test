import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { store } from 'ventura/globals';
import { GameListContainer } from './games/game-list-container';
import './root.scss';

export class Root extends React.Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <Router history={createBrowserHistory()}>
          <Route component={GameListContainer} />
        </Router>
      </Provider>
    );
  }
}
