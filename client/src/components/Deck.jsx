import React, { useEffect, useState, Fragment } from 'react';
import { getRecommended } from '../spotify-api';
import Card from './Card';
import styled from 'styled-components';

const Icon = styled.i`
  font-size: 3em;
  margin: 0 15px;
  z-index: 200;
`;

const Deck = () => {
  const [trackList, setTrackList] = useState();
  const [track, setTrack] = useState();

  useEffect(() => {
    async function fetchTracks() {
      const {
        data: { tracks },
      } = await getRecommended('?seed_genres=electro');

      setTrackList(tracks);
      setTrack(tracks[0]);
    }
    fetchTracks();
  }, []);

  const nextSong = () => {
    trackList.splice(0, 1);
    setTrackList(trackList);
    setTrack(trackList[0]);
  };

  console.log(track);

  return (
    <Fragment>
      <Icon className="fas fa-times-circle" style={{ color: 'red' }}></Icon>
      {track && (
        <Card
          albumImg={track.album.images[0].url}
          previewUrl={track.preview_url}
          song={track.name}
          artists={track.artists}
        />
      )}
      <Icon
        className="fas fa-heart"
        style={{ color: 'green' }}
        onClick={() => nextSong()}
      ></Icon>
    </Fragment>
  );
};

export default Deck;
