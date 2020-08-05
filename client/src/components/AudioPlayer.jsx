import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const PlayButton = styled.div`
  z-index: 100;
  font-size: 5em;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  opacity: 0.8;
`;

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle];
};

const AudioPlayer = ({ url }) => {
  const [playing, toggle] = useAudio(url);

  return (
    <PlayButton onClick={toggle}>
      {playing ? (
        <i className="fas fa-pause"></i>
      ) : (
        <i className="fas fa-play"></i>
      )}
    </PlayButton>
  );
};

export default AudioPlayer;
