import React from 'react';
import Checkbox from './Checkbox';
import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 20px 0px;

  button:focus {
    background-color: red;
  }
`;

const CheckboxSection = () => {
  return (
    <ButtonGroup>
      <Checkbox buttonText="genres" />
      <Checkbox buttonText="songs" />
      <Checkbox buttonText="artists" />
    </ButtonGroup>
  );
};

export default CheckboxSection;
