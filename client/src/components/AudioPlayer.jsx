import React, { useState } from 'react';
import styled from 'styled-components';
import useAudioPlayer from '../hooks/useAudioPlayer';

const PlayButton = styled.div`
  position: absolute;
  z-index: 100;
  font-size: 5em;
  cursor: pointer;
  opacity: 0.8;
  height: 20%;
  top: 400px;
`;

const AudioWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Slider = styled.input`
  margin-top: 15px;
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

const AudioPlayer = () => {
  const [volume, setVolume] = useState(50);
  const { adjustVolume, togglePlay, isPlaying, noFile } = useAudioPlayer();

  const handleChange = (e) => {
    setVolume(e.target.value);
    adjustVolume(e.target.value / 100);
  };

  return (
    <AudioWrapper>
      {!noFile && (
        <PlayButton onClick={togglePlay}>
          {isPlaying ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
          )}
        </PlayButton>
      )}
      <Slider
        type="range"
        min="0"
        max="100"
        value={volume}
        className="slider"
        id="range"
        onChange={(e) => handleChange(e)}
      ></Slider>
    </AudioWrapper>
  );
};

export default AudioPlayer;
