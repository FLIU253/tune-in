import React from 'react';
import styled from 'styled-components';

const login_uri =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8000/login'
    : 'https://agile-shore-54953.herokuapp.com/login';

const Login = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const LoginButton = styled.a`
  display: inline-block;
  background-color: ${(props) => props.theme.tiffanyBlue};
  color: ${(props) => props.theme.babyPowder};
  border-radius: 30px;
  padding: 17px 35px;
  margin: 20px 0 70px;
  min-width: 160px;
  font-weight: 700;
  letter-spacing: 2px;
  text-decoration: none;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover,
  &:focus {
    background-color: #1ed760;
  }
`;

const LoginScreen = () => (
  <Login>
    <h1>Seek. Tune In. Listen</h1>
    <LoginButton href={login_uri}>Log in With Spotify</LoginButton>
  </Login>
);

export default LoginScreen;
