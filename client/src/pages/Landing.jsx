import React from 'react';
import { token } from '../spotify-api';

import Login from './Login';
import ExplorePage from './ExplorePage';
import SearchPage from './SearchPage';

const Landing = () => {
  return <div>{token ? <SearchPage /> : <Login />}</div>;
  // return <ExplorePage />;
};

export default Landing;
