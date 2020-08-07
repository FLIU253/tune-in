import React from 'react';
import styled from 'styled-components';
import AudioPlayer from './AudioPlayer';
import 'react-h5-audio-player/lib/styles.css';

const CardSection = styled.div`
  width: 450px;
  height: 600px;
  background-color: ${(props) => props.theme.tiffanyBlue};
  flex-direction: column;
  align-items: center;
  justify-content: start;

  img {
    width: 100%;
    height: auto;
  }

  hr {
    width: 100%;
    border: 2px solid ${(props) => props.theme.orangePeel};
  }
`;

const TMP_IMG_URL =
  'https://i.scdn.co/image/ab67616d0000b273b2525c8d0d196069018814b5';

const PREVIEW_SONG =
  'https://p.scdn.co/mp3-preview/97849001970e88a373f0d7d42b7c35bc0861f91f?cid=e661fb66d5474afe812fb134dc153e31';

const Card = () => {
  return (
    <CardSection>
      <img src={TMP_IMG_URL} alt="album cover" />
      <h1>Deez Nuts</h1>
      <h3>Martin Garrix, Your Mom, My Dad</h3>
      <hr />
      <AudioPlayer url={PREVIEW_SONG} />
    </CardSection>
  );
};

export default Card;
