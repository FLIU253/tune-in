import React, { useEffect } from 'react';
import Card from './Card';
import styled from 'styled-components';
import useAudioPlayer from '../hooks/useAudioPlayer';
import { getRecommended } from '../spotify-api';

const Icon = styled.i`
  font-size: 3em;
  margin: 0 15px;
  z-index: 200;
`;

const DeckWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Deck = ({ params }) => {
  const {
    trackList,
    playTrack,
    isLoaded,
    index,
    playNextTrack,
    playPreviousTrack,
    setTracks,
  } = useAudioPlayer();

  useEffect(() => {
    async function fetchTracks() {
      const {
        data: { tracks },
      } = await getRecommended({ seed_genres: params.id });

      setTracks(tracks);
    }
    fetchTracks();

    if (isLoaded === true) {
      playTrack(0);
    }
  }, [isLoaded]);

  console.log(trackList[index]);

  return (
    <DeckWrapper>
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
    </DeckWrapper>
  );
};

export default Deck;
