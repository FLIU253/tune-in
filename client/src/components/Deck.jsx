import React, { useEffect } from 'react';
import Card from './Card';
import styled from 'styled-components';
import useAudioPlayer from '../hooks/useAudioPlayer';
import { getRecommended } from '../spotify-api';
import useSearch from '../hooks/useSearch';

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

  const { isArtistsChecked, isGenreChecked, isSongsChecked } = useSearch();

  useEffect(() => {
    async function fetchTracks() {
      if (isGenreChecked) {
        const {
          data: { tracks },
        } = await getRecommended({ seed_genres: params.id });
        setTracks(tracks);
      } else if (isArtistsChecked) {
        const {
          data: { tracks },
        } = await getRecommended({ seed_artists: params.id });
        setTracks(tracks);
      } else if (isSongsChecked) {
        const {
          data: { tracks },
        } = await getRecommended({ seed_tracks: params.id });
        setTracks(tracks);
      }
    }
    fetchTracks();
  }, [isGenreChecked, isArtistsChecked, isSongsChecked, params.id]);

  useEffect(() => {
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
