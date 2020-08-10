import React, { useState, useEffect } from 'react';
import { getRecommended } from '../spotify-api';

const AudioPlayerContext = React.createContext([{}, () => {}]);

const AudioPlayerProvider = (props) => {
  const [audioState, setAudioState] = useState({
    tracks: [],
    currentTrackIndex: null,
    isPlaying: false,
    audioPlayer: new Audio(),
    isLoaded: false,
    noFile: false,
    volume: 0.5,
  });

  useEffect(() => {
    async function fetchTracks() {
      const {
        data: { tracks },
      } = await getRecommended({ seed_genres: 'electro' });
      setAudioState((audioState) => ({
        ...audioState,
        tracks,
        isLoaded: true,
      }));
    }
    fetchTracks();
  }, []);

  return (
    <AudioPlayerContext.Provider value={[audioState, setAudioState]}>
      {props.children}
    </AudioPlayerContext.Provider>
  );
};

export { AudioPlayerContext, AudioPlayerProvider };
