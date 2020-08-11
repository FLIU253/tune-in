import React from 'react';
import './App.css';
import Landing from './pages/Landing';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { AudioPlayerProvider } from './context/AudioPlayerContext';

const theme = {
  richBlack: '#011627',
  babyPowder: '#FDFFFC',
  tiffanyBlue: '#2EC4B6',
  roseMadder: '#E71D36',
  orangePeel: '#FF9F1C',
};

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
    overflow-x: hidden;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 1.5;
    background-color:  ${(props) => props.theme.richBlack};
    color:  ${(props) => props.theme.babyPowder};
  }
  h1, h3 {
    padding: 0;
    margin: 0;
  }
  #root{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function App() {
  return (
    <AudioPlayerProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Landing />
      </ThemeProvider>
    </AudioPlayerProvider>
  );
}

export default App;
