import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';

const PlayButton = styled.div`
  z-index: 100;
  font-size: 5em;
  cursor: pointer;
  opacity: 0.8;
  width: 450px;
  height: 450px;
`;

const Slider = styled.input`
  -webkit-appearance: none;
  width: 50%;
  height: 5px;
  border-radius: 5px;
  background: ${(props) => props.theme.roseMadder};
  outline: none;
  opacity: 1;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
  }

  ::-moz-range-thumb {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #4caf50;
    cursor: pointer;
  }
`;

const useAudio = (url) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
    audio.volume = 0.5;
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle, audio];
};

const AudioPlayer = ({ url }) => {
  const [playing, toggle, audio] = useAudio(url);
  const [volume, setVolume] = useState(50);

  const handleChange = (e) => {
    setVolume(e.target.value);
    audio.volume = e.target.value / 100;
  };

  return (
    <Fragment>
      <PlayButton onClick={toggle}>
        {playing ? (
          <i className="fas fa-pause"></i>
        ) : (
          <i className="fas fa-play"></i>
        )}
      </PlayButton>
      <Slider
        type="range"
        min="0"
        max="100"
        value={volume}
        className="slider"
        id="range"
        onChange={(e) => handleChange(e)}
      ></Slider>
    </Fragment>
  );
};

export default AudioPlayer;
