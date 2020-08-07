import React, { useEffect, useState } from 'react';
import { getRecommended } from '../spotify-api';
import Card from './Card';

const Deck = () => {
  const [trackList, setTrackList] = useState();

  useEffect(() => {
    async function fetchTracks() {
      const { data } = await getRecommended('?seed_genres=country');
      setTrackList(data);
    }

    fetchTracks();
  }, []);

  console.log(trackList);

  return <Card />;
};

export default Deck;
