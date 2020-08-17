import React from 'react';
import { token } from '../spotify-api';

import Login from './Login';
import ExplorePage from './ExplorePage';
import SearchPage from './SearchPage';
import { Route, Switch } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <Switch>
        <Route exact path={'/'} component={token ? SearchPage : Login} />
        <Route path="/:id" component={ExplorePage} />
      </Switch>
    </div>
  );
  // return <ExplorePage />;
};

export default Landing;
