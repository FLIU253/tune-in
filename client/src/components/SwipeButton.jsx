import React from 'react';
import styled from 'styled-components';

const SwipeSection = styled.div`
  margin-bottom: 100px;
  font-size: 3em;
`;

const SwipeButton = ({ swipeStyle, icon }) => {
  return (
    <SwipeSection style={swipeStyle}>
      <i className={`fas fa-${icon}`}></i>
    </SwipeSection>
  );
};

export default SwipeButton;
