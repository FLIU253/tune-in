import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getATrack } from '../spotify-api';
import AudioPlayer from './AudioPlayer';

const CardSection = styled.div`
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    transform: scale(1.3);
    opacity: 0.7;
  }
`;

const CardTextSection = styled.div`
  color: ${(props) => props.theme.orangePeel};
  text-align: center;
  margin-top: 50px;

  h1 {
    padding: 0;
    margin: 0;
  }
`;

const Card = () => {
  const [trackInfo, setTrackInfo] = useState();

  useEffect(() => {
    async function fetchTrack() {
      const { data } = await getATrack('6Sy9BUbgFse0n0LPA5lwy5');
      setTrackInfo(data);
    }
    fetchTrack();
  }, []);

  return (
    <CardSection>
      {console.log(trackInfo)}
      {trackInfo && (
        <div>
          <img src={trackInfo.album.images[1].url} alt="album cover" />
          <AudioPlayer url={trackInfo.preview_url} />
          <CardTextSection>
            <h1>{trackInfo.name}</h1>
            {trackInfo.artists.map((artist, i) => (
              <span key={i}>{artist.name}</span>
            ))}
          </CardTextSection>
        </div>
      )}
    </CardSection>
  );
};

export default Card;
