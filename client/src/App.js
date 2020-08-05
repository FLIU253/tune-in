import React from 'react';
import './App.css';
import Landing from './pages/Landing';
import styled, { ThemeProvider } from 'styled-components';

const theme = {
  richBlack: '#011627',
  babyPowder: '#FDFFFC',
  tiffanyBlue: '#2EC4B6',
  roseMadder: '#E71D36',
  orangePeel: '#FF9F1C',
};

const StyledPage = styled.div`
  background-color: ${(props) => props.theme.richBlack};
  color: ${(props) => props.theme.babyPowder};
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <Landing />
      </StyledPage>
    </ThemeProvider>
  );
}

export default App;
