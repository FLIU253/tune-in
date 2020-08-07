import React from 'react';
import styled from 'styled-components';
import AudioPlayer from './AudioPlayer';

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
  h1 {
    font-size: 1.5em;
  }
`;

const Card = ({ albumImg, previewUrl, song, artists }) => {
  return (
    <CardSection>
      <img src={albumImg} alt="album cover" />
      <h1>{song}</h1>
      <h3>
        {artists.map((artist, i) => (
          <span key={artist.id}>
            {artist.name}
            {artists[i + 1] ? ', ' : ' '}
          </span>
        ))}
      </h3>
      <hr />
      <AudioPlayer url={previewUrl} />
    </CardSection>
  );
};

export default Card;
