import React from 'react';
import Card from '../components/Card.jsx';
import SwipeButton from '../components/SwipeButton';
import styled from 'styled-components';

const Columns = styled.div`
  display: grid;
  grid-template-columns: 30% auto 30%;
  align-items: center;
`;

const Profile = () => {
  return (
    <Columns>
      <SwipeButton swipeStyle={{ justifySelf: 'end' }} icon="thumbs-down" />
      <Card />
      <SwipeButton swipeStyle={{ justifySelf: 'start' }} icon="thumbs-up" />
    </Columns>
  );
};

export default Profile;
