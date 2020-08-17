import React from 'react';
import Deck from '../components/Deck';

const ExplorePage = ({ match: { params } }) => {
  return (
    <div>
      <Deck params={params} />
    </div>
  );
};

export default ExplorePage;
