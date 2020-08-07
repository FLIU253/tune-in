import React from 'react';
import { token } from '../spotify-api';

import Login from './Login';
import Main from './Main';

const Landing = () => {
  return <div>{token ? <Main /> : <Login />}</div>;
  // return <Main />;
};

export default Landing;
