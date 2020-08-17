import React, { useState, useEffect } from 'react';
import { getRecommended } from '../spotify-api';
// reference found here: https://upmostly.com/tutorials/how-to-use-the-usecontext-hook-in-react

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

  return (
    <AudioPlayerContext.Provider value={[audioState, setAudioState]}>
      {props.children}
    </AudioPlayerContext.Provider>
  );
};

export { AudioPlayerContext, AudioPlayerProvider };
