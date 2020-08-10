import React, { useEffect, Fragment } from 'react';
import Card from './Card';
import styled from 'styled-components';
import useAudioPlayer from '../hooks/useAudioPlayer';

const Icon = styled.i`
  font-size: 3em;
  margin: 0 15px;
  z-index: 200;
`;

const Deck = () => {
  const {
    trackList,
    playTrack,
    isLoaded,
    index,
    playNextTrack,
    playPreviousTrack,
  } = useAudioPlayer();

  useEffect(() => {
    if (isLoaded === true) {
      playTrack(0);
    }
  }, [isLoaded]);

  console.log(trackList[index]);

  return (
    <Fragment>
      <Icon
        className="fas fa-times-circle"
        style={{ color: 'red', cursor: 'pointer' }}
        onClick={playPreviousTrack}
      ></Icon>
      {trackList[index] && (
        <Card
          albumImg={trackList[index].album.images[0].url}
          song={trackList[index].name}
          artists={trackList[index].artists}
        />
      )}
      <Icon
        className="fas fa-heart"
        style={{ color: 'green', cursor: 'pointer' }}
        onClick={() => playNextTrack()}
      ></Icon>
    </Fragment>
  );
};

export default Deck;
