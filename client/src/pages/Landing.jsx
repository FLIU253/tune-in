import React from 'react';
import { token } from '../spotify-api';

import Login from './Login';
import Profile from './Profile';

const Landing = () => {
  return <div>{token ? <Profile /> : <Login />}</div>;
};

export default Landing;
