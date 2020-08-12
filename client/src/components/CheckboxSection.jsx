import React, { useState, useEffect } from 'react';
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
  const [checkedItems, setCheckedItems] = useState({
    genres: true,
    songs: false,
    artists: false,
  });

  const toggleCheckbox = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    console.log('checkedItems: ', checkedItems);
  }, [checkedItems]);

  return (
    <ButtonGroup>
      <Checkbox
        buttonText="genres"
        checked={checkedItems.genres}
        toggleCheckbox={toggleCheckbox}
      />
      <Checkbox
        buttonText="songs"
        checked={checkedItems.songs}
        toggleCheckbox={toggleCheckbox}
      />
      <Checkbox
        buttonText="artists"
        checked={checkedItems.artists}
        toggleCheckbox={toggleCheckbox}
      />
    </ButtonGroup>
  );
};

export default CheckboxSection;
